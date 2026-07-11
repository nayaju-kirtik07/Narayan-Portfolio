const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || "";

export function resolveMediaUrl(value: string | undefined | null): string {
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://") || value.startsWith("/")) {
    return value;
  }
  return `${R2_PUBLIC_URL}/${value}`;
}

export function stripBaseUrl(value: string | undefined | null): string {
  if (!value) return "";
  if (R2_PUBLIC_URL && value.startsWith(R2_PUBLIC_URL)) {
    return value.slice(R2_PUBLIC_URL.length + 1);
  }
  const r2Match = value.match(/https:\/\/pub-[^/]+\.r2\.dev\/(?:[^/]+\/)?(.+)/);
  if (r2Match) {
    return r2Match[1];
  }
  return value;
}
