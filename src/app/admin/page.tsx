"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Save, X, LogOut, Upload, Video } from "lucide-react";
import type { Project, Service, Testimonial, SiteData, Reel } from "@/lib/types";

type Tab = "projects" | "services" | "testimonials" | "reels" | "site";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [tab, setTab] = useState<Tab>("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [reels, setReels] = useState<Reel[]>([]);
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth").then((res) => {
      if (!res.ok) router.push("/admin/login");
      else setAuthenticated(true);
    });
  }, [router]);

  useEffect(() => {
    if (!authenticated) return;
    fetchData();
  }, [authenticated]);

  const fetchData = async () => {
    const [p, s, t, r, sd] = await Promise.all([
      fetch("/api/projects").then((r) => r.json()),
      fetch("/api/services").then((r) => r.json()),
      fetch("/api/testimonials").then((r) => r.json()),
      fetch("/api/reels").then((r) => r.json()),
      fetch("/api/site").then((r) => r.json()),
    ]);
    setProjects(p);
    setServices(s);
    setTestimonials(t);
    setReels(r);
    setSiteData(sd);
  };

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  if (!authenticated) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-bold">
          <span className="text-gradient">CMS</span> Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
        >
          <LogOut size={16} /> Logout
        </button>
      </header>

      <div className="flex border-b border-white/5 overflow-x-auto">
        {(["projects", "services", "testimonials", "reels", "site"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-3 text-sm font-medium transition-colors capitalize whitespace-nowrap ${
              tab === t ? "text-accent border-b-2 border-accent" : "text-muted hover:text-foreground"
            }`}
          >
            {t === "reels" ? "Video Reels" : t}
          </button>
        ))}
      </div>

      <div className="p-6 max-w-5xl mx-auto">
        {tab === "projects" && (
          <CrudPanel
            items={projects}
            fields={[
              { key: "title", label: "Title" },
              { key: "category", label: "Category" },
              { key: "description", label: "Description", type: "textarea" },
              { key: "image", label: "Thumbnail Image URL", accept: "image/*" },
              { key: "videoUrl", label: "Video URL (optional)", accept: "video/*" },
            ]}
            onSave={async (item) => {
              await fetch("/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(item),
              });
              fetchData();
            }}
            onDelete={async (id) => {
              await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
              fetchData();
            }}
          />
        )}
        {tab === "services" && (
          <CrudPanel
            items={services}
            fields={[
              { key: "title", label: "Title" },
              { key: "description", label: "Description", type: "textarea" },
            ]}
            onSave={async (item) => {
              await fetch("/api/services", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(item),
              });
              fetchData();
            }}
            onDelete={async (id) => {
              await fetch(`/api/services?id=${id}`, { method: "DELETE" });
              fetchData();
            }}
          />
        )}
        {tab === "testimonials" && (
          <CrudPanel
            items={testimonials}
            fields={[
              { key: "name", label: "Name" },
              { key: "role", label: "Role" },
              { key: "company", label: "Company" },
              { key: "content", label: "Content", type: "textarea" },
              { key: "avatar", label: "Avatar URL", accept: "image/*" },
            ]}
            onSave={async (item) => {
              await fetch("/api/testimonials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(item),
              });
              fetchData();
            }}
            onDelete={async (id) => {
              await fetch(`/api/testimonials?id=${id}`, { method: "DELETE" });
              fetchData();
            }}
          />
        )}
        {tab === "reels" && (
          <CrudPanel
            items={reels}
            fields={[
              { key: "image", label: "Thumbnail URL", accept: "image/*" },
              { key: "videoUrl", label: "Video URL", accept: "video/*" },
              { key: "likes", label: "Likes Count" },
              { key: "views", label: "Views Count" },
            ]}
            onSave={async (item) => {
              await fetch("/api/reels", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(item),
              });
              fetchData();
            }}
            onDelete={async (id) => {
              await fetch(`/api/reels?id=${id}`, { method: "DELETE" });
              fetchData();
            }}
          />
        )}
        {tab === "site" && siteData && (
          <SiteSettingsPanel data={siteData} onSave={async (data) => {
            await fetch("/api/site", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });
            fetchData();
          }} />
        )}
      </div>
    </div>
  );
}

interface Field {
  key: string;
  label: string;
  type?: "text" | "textarea";
  accept?: string;
}

function FileUpload({
  accept,
  onUploaded,
}: {
  accept: string;
  onUploaded: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.key) onUploaded(data.key);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-2 px-4 py-2 border border-dashed border-white/20 text-muted rounded-xl text-sm hover:border-accent hover:text-accent transition-colors disabled:opacity-50"
      >
        <Upload size={16} />
        {uploading ? "Uploading..." : "Upload File"}
      </button>
    </div>
  );
}

function CrudPanel<T extends { id: string }>({
  items,
  fields,
  onSave,
  onDelete,
}: {
  items: T[];
  fields: Field[];
  onSave: (item: T) => void;
  onDelete: (id: string) => void;
}) {
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});

  const startEdit = (item?: T) => {
    if (item) {
      setForm(Object.fromEntries(fields.map((f) => [f.key, (item as any)[f.key] || ""])));
      setEditing(item.id);
    } else {
      setForm(Object.fromEntries(fields.map((f) => [f.key, ""])));
      setEditing("new");
    }
  };

  const save = () => {
    const item = {
      id: editing === "new" ? Date.now().toString() : editing!,
      ...form,
    } as unknown as T;
    onSave(item);
    setEditing(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold capitalize">Manage</h2>
        <button
          onClick={() => startEdit()}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-background rounded-full text-sm font-medium hover:bg-accent-hover transition-colors"
        >
          <Plus size={16} /> Add New
        </button>
      </div>

      {editing && (
        <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="text-sm text-muted block mb-1">{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  value={form[field.key] || ""}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-accent transition-colors text-sm resize-none"
                  rows={3}
                />
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={form[field.key] || ""}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    placeholder={field.label}
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-accent transition-colors text-sm"
                  />
                  {field.accept && (
                    <FileUpload
                      accept={field.accept}
                      onUploaded={(url) => setForm({ ...form, [field.key]: url })}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
          <div className="flex gap-3">
            <button
              onClick={save}
              className="flex items-center gap-2 px-5 py-2 bg-accent text-background rounded-full text-sm font-medium hover:bg-accent-hover transition-colors"
            >
              <Save size={16} /> Save
            </button>
            <button
              onClick={() => setEditing(null)}
              className="flex items-center gap-2 px-5 py-2 border border-white/20 text-muted rounded-full text-sm hover:text-foreground transition-colors"
            >
              <X size={16} /> Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((item) => {
          const primary = (item as any)[fields[0]?.key];
          const secondary = fields[1] ? (item as any)[fields[1]?.key] : null;
          const hasVideo = (item as any).videoUrl && (item as any).videoUrl !== "#";
          return (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate flex items-center gap-2">
                  {hasVideo && <Video size={14} className="text-accent flex-shrink-0" />}
                  {primary || "Untitled"}
                </p>
                {secondary && (
                  <p className="text-muted text-xs truncate mt-0.5">{secondary}</p>
                )}
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => startEdit(item)}
                  className="p-2 text-muted hover:text-accent transition-colors"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="p-2 text-muted hover:text-red-400 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
        {items.length === 0 && (
          <p className="text-muted text-sm text-center py-8">No items yet. Add one!</p>
        )}
      </div>
    </div>
  );
}

function SiteSettingsPanel({
  data,
  onSave,
}: {
  data: SiteData;
  onSave: (data: SiteData) => void;
}) {
  const [form, setForm] = useState(JSON.parse(JSON.stringify(data)));

  const update = (path: string, value: any) => {
    const copy = { ...form };
    const keys = path.split(".");
    let obj: any = copy;
    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    setForm(copy);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Site Settings</h2>
      <div className="space-y-8">
        <Section title="Hero">
          <Field label="Available Text" value={form.hero.available} onChange={(v) => update("hero.available", v)} />
          <Field label="Title" value={form.hero.title} onChange={(v) => update("hero.title", v)} />
        </Section>

        <Section title="About">
          <FieldUpload label="Profile Image" value={form.about.image} onChange={(v) => update("about.image", v)} accept="image/*" />
          <Field label="Description" type="textarea" value={form.about.description} onChange={(v) => update("about.description", v)} />
          <Field label="Years of Craft" value={form.about.yearsCraft.toString()} onChange={(v) => update("about.yearsCraft", parseInt(v) || 0)} />
          <Field label="Resume URL" value={form.about.resumeUrl} onChange={(v) => update("about.resumeUrl", v)} />
        </Section>

        <Section title="Showreel">
          <Field label="Title" value={form.showreel.title} onChange={(v) => update("showreel.title", v)} />
          <Field label="Description" type="textarea" value={form.showreel.description} onChange={(v) => update("showreel.description", v)} />
          <FieldUpload label="Thumbnail URL" value={form.showreel.thumbnail} onChange={(v) => update("showreel.thumbnail", v)} accept="image/*" />
          <FieldUpload label="Video URL" value={form.showreel.videoUrl} onChange={(v) => update("showreel.videoUrl", v)} accept="video/*" />
        </Section>

        <Section title="Contact">
          <Field label="Email" value={form.contact.email} onChange={(v) => update("contact.email", v)} />
          <Field label="WhatsApp" value={form.contact.whatsapp} onChange={(v) => update("contact.whatsapp", v)} />
          <Field label="Location" value={form.contact.location} onChange={(v) => update("contact.location", v)} />
          <Field label="Instagram Handle" value={form.contact.instagram} onChange={(v) => update("contact.instagram", v)} />
        </Section>

        <button
          onClick={() => onSave(form)}
          className="flex items-center gap-2 px-6 py-3 bg-accent text-background rounded-full font-medium hover:bg-accent-hover transition-colors"
        >
          <Save size={16} /> Save Settings
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
      <h3 className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: "text" | "textarea";
}) {
  return (
    <div>
      <label className="text-sm text-muted block mb-1">{label}</label>
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-accent transition-colors text-sm resize-none"
          rows={3}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-accent transition-colors text-sm"
        />
      )}
    </div>
  );
}

function FieldUpload({
  label,
  value,
  onChange,
  accept,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  accept: string;
}) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.key) onChange(data.key);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="text-sm text-muted block mb-1">{label}</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-accent transition-colors text-sm"
        />
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 px-4 py-3 border border-dashed border-white/20 text-muted rounded-xl text-sm hover:border-accent hover:text-accent transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          <Upload size={16} />
          {uploading ? "..." : "Upload"}
        </button>
      </div>
    </div>
  );
}
