const AVATAR_PUBLIC_PATH = "/assets/images/avatars";

const getFilename = (path) => {
  if (!path || typeof path !== "string") return null;
  return path.split("/").pop();
};

const fixAvatarPath = (path) => {
  if (!path || typeof path !== "string") return path;
  const filename = path.split("/").pop();
  return `${AVATAR_PUBLIC_PATH}/${filename}`;
};

const normalizeItemAvatar = (item) => {
  if (!item || typeof item !== "object") return item;
  if (!item.avatar || typeof item.avatar !== "string") return item;

  const trimmedAvatar = item.avatar.trim();

  if (trimmedAvatar.startsWith("/assets/images/avatar/")) {
    const filename = trimmedAvatar.split("/").pop();
    return { ...item, avatar: `${AVATAR_PUBLIC_PATH}/${filename}` };
  }

  if (!trimmedAvatar.startsWith("/assets/")) {
    return { ...item, avatar: fixAvatarPath(trimmedAvatar) };
  }

  return item;
};

export const normalizeStructure = (datas) => {
  if (!datas) return datas;
  if (Array.isArray(datas)) return datas.map(normalizeItemAvatar);
  if (typeof datas === "object") {
    const copy = { ...datas };
    for (const k of Object.keys(copy)) {
      if (Array.isArray(copy[k])) copy[k] = copy[k].map(normalizeItemAvatar);
    }
    return copy;
  }
  return datas;
};

export const saveToStore = (label, datas) => {
  try {
    const normalized = normalizeStructure(datas);
    localStorage.setItem(label, JSON.stringify(normalized));
  } catch (e) {
    console.error("localStorage save error:", e);
  }
};

export const loadFromStore = (label) => {
  try {
    const raw = localStorage.getItem(label);
    if (!raw) return null;
    const parsed = JSON.parse(raw);

    return normalizeStructure(parsed);
  } catch (e) {
    console.error("localStorage load error:", e);
    return null;
  }
};
