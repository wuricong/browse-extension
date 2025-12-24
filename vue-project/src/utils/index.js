export const ENV = import.meta.env

export const ISDEV = ENV.MODE === "development"

async function deriveKeyFromSeed(seed, salt) {
  const encoder = new TextEncoder()

  const baseKey = await crypto.subtle.importKey("raw", encoder.encode(seed), "PBKDF2", false, ["deriveKey"])

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  )
}

/**
 * @description 对称加密内容
 * @param text 加密内容
 * @param seed 加密种子
 * */
export async function encryptWithSeed(text, seed) {
  const encoder = new TextEncoder()

  const salt = crypto.getRandomValues(new Uint8Array(16))
  const iv = crypto.getRandomValues(new Uint8Array(12))

  const key = await deriveKeyFromSeed(seed, salt)

  const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoder.encode(text))

  return {
    salt: Array.from(salt),
    iv: Array.from(iv),
    cipher: Array.from(new Uint8Array(encrypted)),
  }
}

/**
 * @description 对称解密内容
 * @param data 需要解密的内容
 * @param seed 解密种子
 * */
export async function decryptWithSeed(data, seed) {
  const key = await deriveKeyFromSeed(seed, new Uint8Array(data.salt))

  const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv: new Uint8Array(data.iv) }, key, new Uint8Array(data.cipher))

  return new TextDecoder().decode(decrypted)
}

export function packEncrypted(data) {
  return btoa(
    JSON.stringify({
      s: data.salt,
      i: data.iv,
      c: data.cipher,
    }),
  )
}

export function unpackEncrypted(str) {
  const obj = JSON.parse(atob(str))
  return {
    salt: obj.s,
    iv: obj.i,
    cipher: obj.c,
  }
}
