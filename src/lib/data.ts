import mongoose from "mongoose";
import { connectDB } from "./mongodb";
import { Project, Service, Testimonial, ReelModel, SiteDataModel } from "./models";
import type { Project as ProjectType, Service as ServiceType, Testimonial as TestimonialType, SiteData, Reel } from "./types";
import { resolveMediaUrl, stripBaseUrl } from "./media";

function toJSON(doc: any): any {
  if (!doc) return null;
  const raw = doc.toObject ? doc.toObject() : doc;
  const obj = JSON.parse(JSON.stringify(raw));
  const { _id, __v, ...rest } = obj;
  return { id: _id?.toString() || _id, ...rest };
}

function toJSONList(docs: any[]): any[] {
  return docs.map(toJSON);
}

function resolveProject(p: ProjectType): ProjectType {
  return { ...p, image: resolveMediaUrl(p.image), videoUrl: resolveMediaUrl(p.videoUrl), youtubeUrl: p.youtubeUrl };
}

function resolveService(s: ServiceType): ServiceType {
  return { ...s, icon: resolveMediaUrl(s.icon) };
}

function resolveTestimonial(t: TestimonialType): TestimonialType {
  return { ...t, avatar: resolveMediaUrl(t.avatar) };
}

function resolveReel(r: Reel): Reel {
  return { ...r, image: resolveMediaUrl(r.image), videoUrl: resolveMediaUrl(r.videoUrl) };
}

function resolveSiteData(data: SiteData): SiteData {
  return {
    ...data,
    hero: { ...data.hero, backgroundVideo: resolveMediaUrl(data.hero.backgroundVideo) },
    about: { ...data.about, image: resolveMediaUrl(data.about.image) },
    showreel: {
      ...data.showreel,
      thumbnail: resolveMediaUrl(data.showreel.thumbnail),
      videoUrl: resolveMediaUrl(data.showreel.videoUrl),
    },
    instagram: {
      ...data.instagram,
      reels: data.instagram.reels.map(resolveReel),
    },
    bts: { images: data.bts.images.map(resolveMediaUrl) },
  };
}

function stripProject(p: ProjectType): any {
  const { id, ...rest } = p;
  return { ...rest, image: stripBaseUrl(rest.image), videoUrl: stripBaseUrl(rest.videoUrl), youtubeUrl: rest.youtubeUrl || "" };
}

function stripService(s: ServiceType): any {
  const { id, ...rest } = s;
  return { ...rest, icon: stripBaseUrl(rest.icon) };
}

function stripTestimonial(t: TestimonialType): any {
  const { id, ...rest } = t;
  return { ...rest, avatar: stripBaseUrl(rest.avatar) };
}

function stripReel(r: Reel): any {
  const { id, ...rest } = r;
  return { ...rest, image: stripBaseUrl(rest.image), videoUrl: stripBaseUrl(rest.videoUrl) };
}

function isValidObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

// Projects
export async function getProjects(): Promise<ProjectType[]> {
  await connectDB();
  const docs = await Project.find().sort({ createdAt: -1 });
  return toJSONList(docs).map(resolveProject);
}

export async function getProject(id: string): Promise<ProjectType | null> {
  await connectDB();
  const doc = await Project.findById(id);
  return doc ? resolveProject(toJSON(doc)) : null;
}

export async function saveProject(project: ProjectType) {
  await connectDB();
  const data = stripProject(project);
  if (project.id && isValidObjectId(project.id)) {
    await Project.findByIdAndUpdate(project.id, data, { upsert: true, new: true });
  } else {
    await Project.create(data);
  }
}

export async function deleteProject(id: string) {
  await connectDB();
  await Project.findByIdAndDelete(id);
}

// Services
export async function getServices(): Promise<ServiceType[]> {
  await connectDB();
  const docs = await Service.find().sort({ createdAt: -1 });
  return toJSONList(docs).map(resolveService);
}

export async function saveService(service: ServiceType) {
  await connectDB();
  const data = stripService(service);
  if (service.id && isValidObjectId(service.id)) {
    await Service.findByIdAndUpdate(service.id, data, { upsert: true, new: true });
  } else {
    await Service.create(data);
  }
}

export async function deleteService(id: string) {
  await connectDB();
  await Service.findByIdAndDelete(id);
}

// Testimonials
export async function getTestimonials(): Promise<TestimonialType[]> {
  await connectDB();
  const docs = await Testimonial.find().sort({ createdAt: -1 });
  return toJSONList(docs).map(resolveTestimonial);
}

export async function saveTestimonial(testimonial: TestimonialType) {
  await connectDB();
  const data = stripTestimonial(testimonial);
  if (testimonial.id && isValidObjectId(testimonial.id)) {
    await Testimonial.findByIdAndUpdate(testimonial.id, data, { upsert: true, new: true });
  } else {
    await Testimonial.create(data);
  }
}

export async function deleteTestimonial(id: string) {
  await connectDB();
  await Testimonial.findByIdAndDelete(id);
}

// Reels
export async function getReels(): Promise<Reel[]> {
  await connectDB();
  const docs = await ReelModel.find().sort({ createdAt: -1 });
  return toJSONList(docs).map(resolveReel);
}

export async function saveReel(reel: Reel) {
  await connectDB();
  const data = stripReel(reel);
  if (reel.id && isValidObjectId(reel.id)) {
    await ReelModel.findByIdAndUpdate(reel.id, data, { upsert: true, new: true });
  } else {
    const doc = await ReelModel.create(data);
    const site = await SiteDataModel.findOne();
    if (site) {
      site.instagram.reels.push(doc._id);
      await site.save();
    }
  }
}

export async function deleteReel(id: string) {
  await connectDB();
  await ReelModel.findByIdAndDelete(id);
  const site = await SiteDataModel.findOne();
  if (site) {
    site.instagram.reels = site.instagram.reels.filter(
      (r: any) => r.toString() !== id
    );
    await site.save();
  }
}

// Site Data
const DEFAULT_SITE_DATA = {
  hero: {
    title: "Hi, I'm Narayan Khatri",
    subtitle: ["Video Editor", "Documentary Filmmaker", "Visual Storyteller"],
    available: "Available for projects — 2026",
    backgroundVideo: "",
  },
  about: {
    image: "/images/portrait.jpg",
    yearsCraft: 2,
    description: "I'm a passionate video editor with over 2 years of experience creating documentaries, commercial videos, podcasts, travel films, promotional content, and cinematic edits. I specialize in storytelling through visuals and motion graphics.",
    stats: [
      { label: "Videos Edited", value: "100+" },
      { label: "Years Experience", value: "2+" },
      { label: "Happy Clients", value: "30+" },
      { label: "Combined Views", value: "10M+" },
    ],
    resumeUrl: "#",
  },
  showreel: {
    title: "The Showreel",
    description: "A 90-second cut of my favorite frames from the last 12 months — documentaries, commercials, music videos and travel.",
    thumbnail: "/images/showreel.jpg",
    videoUrl: "#",
  },
  instagram: {
    username: "narayan.edits",
    reels: [],
  },
  bts: {
    images: ["/images/bts-1.jpg", "/images/bts-2.jpg", "/images/bts-3.jpg"],
  },
  contact: {
    email: "hello@narayankhatri.com",
    whatsapp: "+977 98 4321 0000",
    location: "Kathmandu, Nepal — Available worldwide",
    instagram: "@narayan.edits",
  },
  social: {},
};

export async function getSiteData(): Promise<SiteData> {
  await connectDB();
  let doc = await SiteDataModel.findOne().populate("instagram.reels");
  if (!doc) {
    doc = await SiteDataModel.create(DEFAULT_SITE_DATA);
    doc = await SiteDataModel.findOne().populate("instagram.reels");
  }
  const json = toJSON(doc);
  if (json.instagram?.reels) {
    json.instagram.reels = json.instagram.reels.map((r: any) => {
      if (typeof r === "object" && r !== null) {
        return resolveReel({ id: r._id?.toString() || r.id, image: r.image || "", videoUrl: r.videoUrl || "", likes: r.likes || "0", views: r.views || "0" });
      }
      return r;
    });
  }
  return resolveSiteData(json);
}

export async function saveSiteData(data: SiteData) {
  await connectDB();
  const { instagram, ...rest } = data as any;
  const updateData = { ...rest };
  if (instagram?.username) {
    updateData.instagram = { ...instagram };
    delete updateData.instagram.reels;
  }
  await SiteDataModel.findOneAndUpdate({}, updateData, { upsert: true, new: true });
}
