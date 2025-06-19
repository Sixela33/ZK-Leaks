import {
  EncryptionSecretKey,
  NetworkId
} from "./chunk-B66ZZV5W.js";

// ../node_modules/@scure/base/lib/esm/index.js
function isBytes(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
function abytes(b, ...lengths) {
  if (!isBytes(b))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b.length))
    throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
}
function isArrayOf(isString, arr) {
  if (!Array.isArray(arr))
    return false;
  if (arr.length === 0)
    return true;
  if (isString) {
    return arr.every((item) => typeof item === "string");
  } else {
    return arr.every((item) => Number.isSafeInteger(item));
  }
}
function afn(input) {
  if (typeof input !== "function")
    throw new Error("function expected");
  return true;
}
function astr(label, input) {
  if (typeof input !== "string")
    throw new Error(`${label}: string expected`);
  return true;
}
function anumber(n) {
  if (!Number.isSafeInteger(n))
    throw new Error(`invalid integer: ${n}`);
}
function aArr(input) {
  if (!Array.isArray(input))
    throw new Error("array expected");
}
function astrArr(label, input) {
  if (!isArrayOf(true, input))
    throw new Error(`${label}: array of strings expected`);
}
function anumArr(label, input) {
  if (!isArrayOf(false, input))
    throw new Error(`${label}: array of numbers expected`);
}
function chain(...args) {
  const id = (a) => a;
  const wrap = (a, b) => (c) => a(b(c));
  const encode = args.map((x) => x.encode).reduceRight(wrap, id);
  const decode = args.map((x) => x.decode).reduce(wrap, id);
  return { encode, decode };
}
function alphabet(letters) {
  const lettersA = typeof letters === "string" ? letters.split("") : letters;
  const len = lettersA.length;
  astrArr("alphabet", lettersA);
  const indexes = new Map(lettersA.map((l, i) => [l, i]));
  return {
    encode: (digits) => {
      aArr(digits);
      return digits.map((i) => {
        if (!Number.isSafeInteger(i) || i < 0 || i >= len)
          throw new Error(`alphabet.encode: digit index outside alphabet "${i}". Allowed: ${letters}`);
        return lettersA[i];
      });
    },
    decode: (input) => {
      aArr(input);
      return input.map((letter) => {
        astr("alphabet.decode", letter);
        const i = indexes.get(letter);
        if (i === void 0)
          throw new Error(`Unknown letter: "${letter}". Allowed: ${letters}`);
        return i;
      });
    }
  };
}
function join(separator = "") {
  astr("join", separator);
  return {
    encode: (from) => {
      astrArr("join.decode", from);
      return from.join(separator);
    },
    decode: (to) => {
      astr("join.decode", to);
      return to.split(separator);
    }
  };
}
function padding(bits, chr = "=") {
  anumber(bits);
  astr("padding", chr);
  return {
    encode(data) {
      astrArr("padding.encode", data);
      while (data.length * bits % 8)
        data.push(chr);
      return data;
    },
    decode(input) {
      astrArr("padding.decode", input);
      let end = input.length;
      if (end * bits % 8)
        throw new Error("padding: invalid, string should have whole number of bytes");
      for (; end > 0 && input[end - 1] === chr; end--) {
        const last = end - 1;
        const byte = last * bits;
        if (byte % 8 === 0)
          throw new Error("padding: invalid, string has too much padding");
      }
      return input.slice(0, end);
    }
  };
}
function normalize(fn) {
  afn(fn);
  return { encode: (from) => from, decode: (to) => fn(to) };
}
function convertRadix(data, from, to) {
  if (from < 2)
    throw new Error(`convertRadix: invalid from=${from}, base cannot be less than 2`);
  if (to < 2)
    throw new Error(`convertRadix: invalid to=${to}, base cannot be less than 2`);
  aArr(data);
  if (!data.length)
    return [];
  let pos = 0;
  const res = [];
  const digits = Array.from(data, (d) => {
    anumber(d);
    if (d < 0 || d >= from)
      throw new Error(`invalid integer: ${d}`);
    return d;
  });
  const dlen = digits.length;
  while (true) {
    let carry = 0;
    let done = true;
    for (let i = pos; i < dlen; i++) {
      const digit = digits[i];
      const fromCarry = from * carry;
      const digitBase = fromCarry + digit;
      if (!Number.isSafeInteger(digitBase) || fromCarry / from !== carry || digitBase - digit !== fromCarry) {
        throw new Error("convertRadix: carry overflow");
      }
      const div = digitBase / to;
      carry = digitBase % to;
      const rounded = Math.floor(div);
      digits[i] = rounded;
      if (!Number.isSafeInteger(rounded) || rounded * to + carry !== digitBase)
        throw new Error("convertRadix: carry overflow");
      if (!done)
        continue;
      else if (!rounded)
        pos = i;
      else
        done = false;
    }
    res.push(carry);
    if (done)
      break;
  }
  for (let i = 0; i < data.length - 1 && data[i] === 0; i++)
    res.push(0);
  return res.reverse();
}
var gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
var radix2carry = (from, to) => from + (to - gcd(from, to));
var powers = (() => {
  let res = [];
  for (let i = 0; i < 40; i++)
    res.push(2 ** i);
  return res;
})();
function convertRadix2(data, from, to, padding2) {
  aArr(data);
  if (from <= 0 || from > 32)
    throw new Error(`convertRadix2: wrong from=${from}`);
  if (to <= 0 || to > 32)
    throw new Error(`convertRadix2: wrong to=${to}`);
  if (radix2carry(from, to) > 32) {
    throw new Error(`convertRadix2: carry overflow from=${from} to=${to} carryBits=${radix2carry(from, to)}`);
  }
  let carry = 0;
  let pos = 0;
  const max = powers[from];
  const mask = powers[to] - 1;
  const res = [];
  for (const n of data) {
    anumber(n);
    if (n >= max)
      throw new Error(`convertRadix2: invalid data word=${n} from=${from}`);
    carry = carry << from | n;
    if (pos + from > 32)
      throw new Error(`convertRadix2: carry overflow pos=${pos} from=${from}`);
    pos += from;
    for (; pos >= to; pos -= to)
      res.push((carry >> pos - to & mask) >>> 0);
    const pow = powers[pos];
    if (pow === void 0)
      throw new Error("invalid carry");
    carry &= pow - 1;
  }
  carry = carry << to - pos & mask;
  if (!padding2 && pos >= from)
    throw new Error("Excess padding");
  if (!padding2 && carry > 0)
    throw new Error(`Non-zero padding: ${carry}`);
  if (padding2 && pos > 0)
    res.push(carry >>> 0);
  return res;
}
function radix(num) {
  anumber(num);
  const _256 = 2 ** 8;
  return {
    encode: (bytes) => {
      if (!isBytes(bytes))
        throw new Error("radix.encode input should be Uint8Array");
      return convertRadix(Array.from(bytes), _256, num);
    },
    decode: (digits) => {
      anumArr("radix.decode", digits);
      return Uint8Array.from(convertRadix(digits, num, _256));
    }
  };
}
function radix2(bits, revPadding = false) {
  anumber(bits);
  if (bits <= 0 || bits > 32)
    throw new Error("radix2: bits should be in (0..32]");
  if (radix2carry(8, bits) > 32 || radix2carry(bits, 8) > 32)
    throw new Error("radix2: carry overflow");
  return {
    encode: (bytes) => {
      if (!isBytes(bytes))
        throw new Error("radix2.encode input should be Uint8Array");
      return convertRadix2(Array.from(bytes), 8, bits, !revPadding);
    },
    decode: (digits) => {
      anumArr("radix2.decode", digits);
      return Uint8Array.from(convertRadix2(digits, bits, 8, revPadding));
    }
  };
}
function unsafeWrapper(fn) {
  afn(fn);
  return function(...args) {
    try {
      return fn.apply(null, args);
    } catch (e) {
    }
  };
}
var base16 = chain(radix2(4), alphabet("0123456789ABCDEF"), join(""));
var base32 = chain(radix2(5), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), padding(5), join(""));
var base32nopad = chain(radix2(5), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), join(""));
var base32hex = chain(radix2(5), alphabet("0123456789ABCDEFGHIJKLMNOPQRSTUV"), padding(5), join(""));
var base32hexnopad = chain(radix2(5), alphabet("0123456789ABCDEFGHIJKLMNOPQRSTUV"), join(""));
var base32crockford = chain(radix2(5), alphabet("0123456789ABCDEFGHJKMNPQRSTVWXYZ"), join(""), normalize((s) => s.toUpperCase().replace(/O/g, "0").replace(/[IL]/g, "1")));
var hasBase64Builtin = (() => typeof Uint8Array.from([]).toBase64 === "function" && typeof Uint8Array.fromBase64 === "function")();
var decodeBase64Builtin = (s, isUrl) => {
  astr("base64", s);
  const re = isUrl ? /^[A-Za-z0-9=_-]+$/ : /^[A-Za-z0-9=+/]+$/;
  const alphabet2 = isUrl ? "base64url" : "base64";
  if (s.length > 0 && !re.test(s))
    throw new Error("invalid base64");
  return Uint8Array.fromBase64(s, { alphabet: alphabet2, lastChunkHandling: "strict" });
};
var base64 = hasBase64Builtin ? {
  encode(b) {
    abytes(b);
    return b.toBase64();
  },
  decode(s) {
    return decodeBase64Builtin(s, false);
  }
} : chain(radix2(6), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), padding(6), join(""));
var base64nopad = chain(radix2(6), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), join(""));
var base64url = hasBase64Builtin ? {
  encode(b) {
    abytes(b);
    return b.toBase64({ alphabet: "base64url" });
  },
  decode(s) {
    return decodeBase64Builtin(s, true);
  }
} : chain(radix2(6), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"), padding(6), join(""));
var base64urlnopad = chain(radix2(6), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"), join(""));
var genBase58 = (abc) => chain(radix(58), alphabet(abc), join(""));
var base58 = genBase58("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
var base58flickr = genBase58("123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ");
var base58xrp = genBase58("rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz");
var BECH_ALPHABET = chain(alphabet("qpzry9x8gf2tvdw0s3jn54khce6mua7l"), join(""));
var POLYMOD_GENERATORS = [996825010, 642813549, 513874426, 1027748829, 705979059];
function bech32Polymod(pre) {
  const b = pre >> 25;
  let chk = (pre & 33554431) << 5;
  for (let i = 0; i < POLYMOD_GENERATORS.length; i++) {
    if ((b >> i & 1) === 1)
      chk ^= POLYMOD_GENERATORS[i];
  }
  return chk;
}
function bechChecksum(prefix, words, encodingConst = 1) {
  const len = prefix.length;
  let chk = 1;
  for (let i = 0; i < len; i++) {
    const c = prefix.charCodeAt(i);
    if (c < 33 || c > 126)
      throw new Error(`Invalid prefix (${prefix})`);
    chk = bech32Polymod(chk) ^ c >> 5;
  }
  chk = bech32Polymod(chk);
  for (let i = 0; i < len; i++)
    chk = bech32Polymod(chk) ^ prefix.charCodeAt(i) & 31;
  for (let v of words)
    chk = bech32Polymod(chk) ^ v;
  for (let i = 0; i < 6; i++)
    chk = bech32Polymod(chk);
  chk ^= encodingConst;
  return BECH_ALPHABET.encode(convertRadix2([chk % powers[30]], 30, 5, false));
}
function genBech32(encoding) {
  const ENCODING_CONST = encoding === "bech32" ? 1 : 734539939;
  const _words = radix2(5);
  const fromWords = _words.decode;
  const toWords = _words.encode;
  const fromWordsUnsafe = unsafeWrapper(fromWords);
  function encode(prefix, words, limit = 90) {
    astr("bech32.encode prefix", prefix);
    if (isBytes(words))
      words = Array.from(words);
    anumArr("bech32.encode", words);
    const plen = prefix.length;
    if (plen === 0)
      throw new TypeError(`Invalid prefix length ${plen}`);
    const actualLength = plen + 7 + words.length;
    if (limit !== false && actualLength > limit)
      throw new TypeError(`Length ${actualLength} exceeds limit ${limit}`);
    const lowered = prefix.toLowerCase();
    const sum = bechChecksum(lowered, words, ENCODING_CONST);
    return `${lowered}1${BECH_ALPHABET.encode(words)}${sum}`;
  }
  function decode(str, limit = 90) {
    astr("bech32.decode input", str);
    const slen = str.length;
    if (slen < 8 || limit !== false && slen > limit)
      throw new TypeError(`invalid string length: ${slen} (${str}). Expected (8..${limit})`);
    const lowered = str.toLowerCase();
    if (str !== lowered && str !== str.toUpperCase())
      throw new Error(`String must be lowercase or uppercase`);
    const sepIndex = lowered.lastIndexOf("1");
    if (sepIndex === 0 || sepIndex === -1)
      throw new Error(`Letter "1" must be present between prefix and data only`);
    const prefix = lowered.slice(0, sepIndex);
    const data = lowered.slice(sepIndex + 1);
    if (data.length < 6)
      throw new Error("Data must be at least 6 characters long");
    const words = BECH_ALPHABET.decode(data).slice(0, -6);
    const sum = bechChecksum(prefix, words, ENCODING_CONST);
    if (!data.endsWith(sum))
      throw new Error(`Invalid checksum in ${str}: expected "${sum}"`);
    return { prefix, words };
  }
  const decodeUnsafe = unsafeWrapper(decode);
  function decodeToBytes(str) {
    const { prefix, words } = decode(str, false);
    return { prefix, words, bytes: fromWords(words) };
  }
  function encodeFromBytes(prefix, bytes) {
    return encode(prefix, toWords(bytes));
  }
  return {
    encode,
    decode,
    encodeFromBytes,
    decodeToBytes,
    decodeUnsafe,
    fromWords,
    fromWordsUnsafe,
    toWords
  };
}
var bech32 = genBech32("bech32");
var bech32m = genBech32("bech32m");
var hasHexBuiltin = (() => typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function")();
var hexBuiltin = {
  encode(data) {
    abytes(data);
    return data.toHex();
  },
  decode(s) {
    astr("hex", s);
    return Uint8Array.fromHex(s);
  }
};
var hex = hasHexBuiltin ? hexBuiltin : chain(radix2(4), alphabet("0123456789abcdef"), join(""), normalize((s) => {
  if (typeof s !== "string" || s.length % 2 !== 0)
    throw new TypeError(`hex.decode: expected string, got ${typeof s} with length ${s.length}`);
  return s.toLowerCase();
}));

// ../node_modules/@midnight-ntwrk/wallet-sdk-address-format/dist/index.js
var MidnightBech32m = class _MidnightBech32m {
  type;
  network;
  data;
  static prefix = "mn";
  static validateSegment(segmentName, segment) {
    const result = /^[A-Za-z1-9-]+$/.test(segment);
    if (!result) {
      throw new Error(`Segment ${segmentName}: ${segment} contains disallowed characters. Allowed characters are only numbers, latin letters and a hyphen`);
    }
  }
  static parse(bech32string) {
    const bech32parsed = bech32m.decodeToBytes(bech32string);
    const [prefix, type, network = null] = bech32parsed.prefix.split("_");
    if (prefix != _MidnightBech32m.prefix) {
      throw new Error(`Expected prefix ${_MidnightBech32m.prefix}`);
    }
    _MidnightBech32m.validateSegment("type", type);
    if (network != null) {
      _MidnightBech32m.validateSegment("network", network);
    }
    return new _MidnightBech32m(type, network, Buffer.from(bech32parsed.bytes));
  }
  constructor(type, network, data) {
    this.type = type;
    this.network = network;
    this.data = data;
    _MidnightBech32m.validateSegment("type", type);
    if (network != null) {
      _MidnightBech32m.validateSegment("network", network);
    }
  }
  asString() {
    const networkSegment = this.network == null ? "" : `_${this.network}`;
    return bech32m.encode(`${_MidnightBech32m.prefix}_${this.type}${networkSegment}`, bech32m.toWords(this.data), false);
  }
};
var Bech32mCodec = class _Bech32mCodec {
  type;
  dataToBytes;
  dataFromBytes;
  constructor(type, dataToBytes, dataFromBytes) {
    this.type = type;
    this.dataToBytes = dataToBytes;
    this.dataFromBytes = dataFromBytes;
  }
  encode(networkId, data) {
    const context = _Bech32mCodec.createContext(networkId);
    return new MidnightBech32m(this.type, context.networkId, this.dataToBytes(data));
  }
  decode(networkId, repr) {
    const context = _Bech32mCodec.createContext(networkId);
    if (repr.type != this.type) {
      throw new Error(`Expected type ${this.type}, got ${repr.type}`);
    }
    if (context.networkId != repr.network) {
      throw new Error(`Expected ${context.networkId ?? "mainnet"} address, got ${repr.network ?? "mainnet"} one`);
    }
    return this.dataFromBytes(repr.data);
  }
  static createContext(networkId) {
    if (networkId === null) {
      return { networkId: null };
    } else if (typeof networkId === "string") {
      return { networkId };
    } else {
      return _Bech32mCodec.createContextFromZswap(networkId);
    }
  }
  static createContextFromZswap(networkId) {
    switch (networkId) {
      case NetworkId.DevNet:
        return { networkId: "dev" };
      case NetworkId.MainNet:
        return { networkId: null };
      case NetworkId.TestNet:
        return { networkId: "test" };
      case NetworkId.Undeployed:
        return { networkId: "undeployed" };
      default:
        return { networkId: null };
    }
  }
};
var ShieldedAddress = class _ShieldedAddress {
  coinPublicKey;
  encryptionPublicKey;
  static codec = new Bech32mCodec("shield-addr", (addr) => Buffer.concat([addr.coinPublicKey.data, addr.encryptionPublicKey.data]), (bytes) => {
    const coinPublicKey = new ShieldedCoinPublicKey(bytes.subarray(0, ShieldedCoinPublicKey.key_length));
    const encryptionPublicKey = new ShieldedEncryptionPublicKey(bytes.subarray(ShieldedCoinPublicKey.key_length));
    return new _ShieldedAddress(coinPublicKey, encryptionPublicKey);
  });
  constructor(coinPublicKey, encryptionPublicKey) {
    this.coinPublicKey = coinPublicKey;
    this.encryptionPublicKey = encryptionPublicKey;
  }
  coinPublicKeyString() {
    return this.coinPublicKey.data.toString("hex");
  }
  encryptionPublicKeyString() {
    return this.encryptionPublicKey.data.toString("hex");
  }
};
var ShieldedEncryptionSecretKey = class _ShieldedEncryptionSecretKey {
  zswap;
  static codec = new Bech32mCodec("shield-esk", (esk) => Buffer.from(esk.zswap.yesIKnowTheSecurityImplicationsOfThis_serialize(NetworkId.Undeployed).subarray(1)), (repr) => new _ShieldedEncryptionSecretKey(EncryptionSecretKey.deserialize(Buffer.concat([Buffer.of(0), repr]), NetworkId.Undeployed)));
  // There are some bits in serialization of field elements and elliptic curve points, that are hard to replicate
  // Thus using zswap implementation directly for serialization purposes
  constructor(zswap) {
    this.zswap = zswap;
  }
};
var ShieldedCoinPublicKey = class _ShieldedCoinPublicKey {
  data;
  static key_length = 32;
  static codec = new Bech32mCodec("shield-cpk", (cpk) => cpk.data, (repr) => new _ShieldedCoinPublicKey(repr));
  constructor(data) {
    this.data = data;
    if (data.length != _ShieldedCoinPublicKey.key_length) {
      throw new Error("Coin public key needs to be 32 bytes long");
    }
  }
};
var ShieldedEncryptionPublicKey = class _ShieldedEncryptionPublicKey {
  data;
  static key_length = 32;
  static codec = new Bech32mCodec("shield-epk", (cpk) => cpk.data, (repr) => new _ShieldedEncryptionPublicKey(repr));
  constructor(data) {
    this.data = data;
  }
};

// ../node_modules/@midnight-ntwrk/midnight-js-utils/dist/index.mjs
function assertDefined(value, message) {
  if (!value) {
    throw new Error(message ?? "Expected value to be defined");
  }
}
function assertUndefined(value, message) {
  if (value) {
    throw new Error(message ?? "Expected value to be null or undefined");
  }
}
var HEX_STRING_REGEXP = /^(?<prefix>(0x)?)(?<byteChars>([0-9A-Fa-f]{2})*)(?<incompleteChars>.*)$/;
var parseHex = (source) => {
  const groups = HEX_STRING_REGEXP.exec(source)?.groups;
  return {
    hasPrefix: groups.prefix === "0x",
    byteChars: groups.byteChars,
    incompleteChars: groups.incompleteChars
  };
};
var toHex = (bytes) => Buffer.from(bytes).toString("hex");
var fromHex = (str) => Buffer.from(str, "hex");
var isHex = (source, byteLen) => {
  if (!source || byteLen !== void 0 && byteLen <= 0) {
    return false;
  }
  const parsedHex = parseHex(source);
  const validByteLen = byteLen ? parsedHex.byteChars.length / 2 === byteLen : parsedHex.byteChars.length > 0;
  return validByteLen && !parsedHex.incompleteChars;
};
function assertIsHex(source, byteLen) {
  if (!source) {
    throw new TypeError("Input string must have non-zero length.");
  }
  if (byteLen !== void 0 && byteLen <= 0) {
    throw new Error("Expected byte length must be greater than zero.");
  }
  const parsedHex = parseHex(source);
  if (parsedHex.incompleteChars) {
    if (parsedHex.incompleteChars.length % 2 > 0) {
      throw new TypeError(`The last byte of input string '${source}' is incomplete.`);
    }
    const invalidCharPos = parsedHex.byteChars.length + (parsedHex.hasPrefix ? 2 : 0);
    throw new TypeError(`Invalid hex-digit '${source[invalidCharPos]}' found in input string at index ${invalidCharPos}.`);
  }
  if (!parsedHex.byteChars) {
    throw new TypeError(`Input string '${source}' is not a valid hex-string.`);
  }
  if (byteLen) {
    const actualByteLen = parsedHex.byteChars.length / 2;
    if (byteLen !== actualByteLen) {
      throw new TypeError(`Expected an input string with byte length of ${byteLen}, got ${actualByteLen}.`);
    }
  }
}
var parseCoinPublicKeyToHex = (possibleBech32, zswapNetworkId) => {
  if (isHex(possibleBech32))
    return possibleBech32;
  const parsedBech32 = MidnightBech32m.parse(possibleBech32);
  const decoded = ShieldedCoinPublicKey.codec.decode(zswapNetworkId, parsedBech32);
  return Buffer.from(decoded.data).toString("hex");
};
var parseEncPublicKeyToHex = (possibleBech32, zswapNetworkId) => {
  if (isHex(possibleBech32))
    return possibleBech32;
  const parsedBech32 = MidnightBech32m.parse(possibleBech32);
  const decoded = ShieldedEncryptionPublicKey.codec.decode(zswapNetworkId, parsedBech32);
  return Buffer.from(decoded.data).toString("hex");
};
function assertIsContractAddress(contractAddress) {
  const CONTRACT_ADDRESS_BYTE_LENGTH = 34;
  assertIsHex(contractAddress, CONTRACT_ADDRESS_BYTE_LENGTH);
  const parsedHex = parseHex(contractAddress);
  if (parsedHex.hasPrefix) {
    throw new TypeError(`Unexpected '0x' prefix in contract address '${contractAddress}'`);
  }
}

export {
  assertDefined,
  assertUndefined,
  toHex,
  fromHex,
  parseCoinPublicKeyToHex,
  parseEncPublicKeyToHex,
  assertIsContractAddress
};
/*! Bundled license information:

@scure/base/lib/esm/index.js:
  (*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
//# sourceMappingURL=chunk-OH4IBLJ7.js.map
