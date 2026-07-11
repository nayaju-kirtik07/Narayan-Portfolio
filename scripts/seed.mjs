import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI environment variable is required");
  process.exit(1);
}

const ProjectSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  image: String,
  videoUrl: String,
}, { timestamps: true });

const ServiceSchema = new mongoose.Schema({
  title: String,
  description: String,
  icon: String,
}, { timestamps: true });

const TestimonialSchema = new mongoose.Schema({
  name: String,
  role: String,
  company: String,
  content: String,
  avatar: String,
}, { timestamps: true });

const ReelSchema = new mongoose.Schema({
  image: String,
  videoUrl: String,
  likes: String,
  views: String,
}, { timestamps: true });

const SiteDataSchema = new mongoose.Schema({
  hero: {
    title: String,
    subtitle: [String],
    available: String,
  },
  about: {
    image: String,
    yearsCraft: Number,
    description: String,
    stats: [{ label: String, value: String }],
    resumeUrl: String,
  },
  showreel: {
    title: String,
    description: String,
    thumbnail: String,
    videoUrl: String,
  },
  instagram: {
    username: String,
    reels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reel" }],
  },
  bts: {
    images: [String],
  },
  contact: {
    email: String,
    whatsapp: String,
    location: String,
    instagram: String,
  },
  social: {
    github: String,
    linkedin: String,
    twitter: String,
    youtube: String,
  },
}, { timestamps: true });

const Project = mongoose.model("Project", ProjectSchema);
const Service = mongoose.model("Service", ServiceSchema);
const Testimonial = mongoose.model("Testimonial", TestimonialSchema);
const Reel = mongoose.model("Reel", ReelSchema);
const SiteData = mongoose.model("SiteData", SiteDataSchema);

const DATA_DIR = path.join(__dirname, "..", "src", "data");

function stripBaseUrl(value) {
  if (!value) return value;
  const match = value.match(/r2\.dev\/(?:[^/]+\/)?(.+)$/);
  return match ? match[1] : value;
}

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  // Clear existing data
  await Promise.all([
    Project.deleteMany({}),
    Service.deleteMany({}),
    Testimonial.deleteMany({}),
    Reel.deleteMany({}),
    SiteData.deleteMany({}),
  ]);
  console.log("Cleared existing data");

  // Seed projects
  const projectsPath = path.join(DATA_DIR, "projects.json");
  if (fs.existsSync(projectsPath)) {
    const projects = JSON.parse(fs.readFileSync(projectsPath, "utf-8"));
    const cleaned = projects.map((p) => ({
      ...p,
      image: stripBaseUrl(p.image),
      videoUrl: stripBaseUrl(p.videoUrl),
    }));
    await Project.insertMany(cleaned);
    console.log(`Seeded ${cleaned.length} projects`);
  }

  // Seed services
  const servicesPath = path.join(DATA_DIR, "services.json");
  if (fs.existsSync(servicesPath)) {
    const services = JSON.parse(fs.readFileSync(servicesPath, "utf-8"));
    await Service.insertMany(services);
    console.log(`Seeded ${services.length} services`);
  }

  // Seed testimonials
  const testimonialsPath = path.join(DATA_DIR, "testimonials.json");
  if (fs.existsSync(testimonialsPath)) {
    const testimonials = JSON.parse(fs.readFileSync(testimonialsPath, "utf-8"));
    await Testimonial.insertMany(testimonials);
    console.log(`Seeded ${testimonials.length} testimonials`);
  }

  // Seed site data + reels
  const sitePath = path.join(DATA_DIR, "site.json");
  if (fs.existsSync(sitePath)) {
    const siteData = JSON.parse(fs.readFileSync(sitePath, "utf-8"));

    // Strip R2 URLs from reels
    const reels = (siteData.instagram.reels || []).map((r) => ({
      ...r,
      image: stripBaseUrl(r.image),
      videoUrl: stripBaseUrl(r.videoUrl),
    }));

    // Create Reel documents and get their IDs
    const reelDocs = await Reel.insertMany(reels);
    const reelIds = reelDocs.map((r) => r._id);

    // Build site document with stripped URLs + reel references
    const siteDoc = {
      ...siteData,
      about: { ...siteData.about, image: stripBaseUrl(siteData.about.image) },
      showreel: {
        ...siteData.showreel,
        thumbnail: stripBaseUrl(siteData.showreel.thumbnail),
        videoUrl: stripBaseUrl(siteData.showreel.videoUrl),
      },
      bts: {
        images: (siteData.bts.images || []).map(stripBaseUrl),
      },
      instagram: {
        ...siteData.instagram,
        reels: reelIds,
      },
    };

    await SiteData.create(siteDoc);
    console.log(`Seeded site data with ${reelIds.length} reels`);
  }

  console.log("\nSeed complete!");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
