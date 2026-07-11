import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  videoUrl: { type: String, default: "" },
  youtubeUrl: { type: String, default: "" },
}, { timestamps: true });

const ServiceSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  icon: { type: String, default: "" },
}, { timestamps: true });

const TestimonialSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, default: "" },
  company: { type: String, default: "" },
  content: { type: String, default: "" },
  avatar: { type: String, default: "" },
}, { timestamps: true });

const ReelSchema = new Schema({
  image: { type: String, default: "" },
  videoUrl: { type: String, default: "" },
  likes: { type: String, default: "0" },
  views: { type: String, default: "0" },
}, { timestamps: true });

const SiteDataSchema = new Schema({
  hero: {
    title: { type: String, default: "Hi, I'm Narayan Khatri" },
    subtitle: [{ type: String }],
    available: { type: String, default: "Available for projects — 2026" },
    backgroundVideo: { type: String, default: "" },
  },
  about: {
    image: { type: String, default: "/images/portrait.jpg" },
    yearsCraft: { type: Number, default: 2 },
    description: { type: String, default: "" },
    stats: [{ label: String, value: String }],
    resumeUrl: { type: String, default: "#" },
  },
  showreel: {
    title: { type: String, default: "The Showreel" },
    description: { type: String, default: "" },
    thumbnail: { type: String, default: "/images/showreel.jpg" },
    videoUrl: { type: String, default: "#" },
  },
  instagram: {
    username: { type: String, default: "narayan.edits" },
    reels: [{ type: Schema.Types.ObjectId, ref: "Reel" }],
  },
  bts: {
    images: [{ type: String }],
  },
  contact: {
    email: { type: String, default: "" },
    whatsapp: { type: String, default: "" },
    location: { type: String, default: "" },
    instagram: { type: String, default: "" },
  },
  social: {
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    twitter: { type: String, default: "" },
    youtube: { type: String, default: "" },
  },
}, { timestamps: true });

export const Project = models.Project || model("Project", ProjectSchema);
export const Service = models.Service || model("Service", ServiceSchema);
export const Testimonial = models.Testimonial || model("Testimonial", TestimonialSchema);
export const ReelModel = models.Reel || model("Reel", ReelSchema);
export const SiteDataModel = models.SiteData || model("SiteData", SiteDataSchema);
