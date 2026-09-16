const w = ({ inData: o = [], inColumns: e = [], inConfig: t = {}, inTopN: n } = {}) => {
  const a = o, s = e, l = t, r = n;
  return {
    originalData: Array.isArray(a) ? typeof structuredClone == "function" ? structuredClone(a) : JSON.parse(JSON.stringify(a)) : [],
    columns: Array.isArray(s) ? s : [],
    config: l || {},
    topN: r
  };
}, D = ({ inColumnsCatalog: o = [], inColumnKeys: e = [] } = {}) => {
  const t = o, n = e;
  if (Array.isArray(n) && n.length > 0) {
    const a = new Map((Array.isArray(t) ? t : []).map((r) => [r.key, r])), s = [], l = [];
    for (const r of n) {
      const c = a.get(r);
      c ? l.push(c) : s.push(r);
    }
    return s.length > 0 && console.warn(
      `[json-to-dom-renderers] Warning: Config requested columns [${s.map((r) => `"${r}"`).join(", ")}] that do not exist in the columns catalog.`
    ), l;
  }
  return Array.isArray(t) ? t : [];
};
class j {
  constructor({ inData: e = [], inColumns: t = [], inConfig: n = {}, inTopN: a } = {}) {
    const s = e, l = t, r = n, c = a;
    this.source = w({
      inData: s,
      inColumns: l,
      inConfig: r,
      inTopN: c
    });
  }
  _buildSource(e) {
    return w(e);
  }
  _resolveActiveColumns(e) {
    return D(e);
  }
  get rawData() {
    return this.source.originalData;
  }
  get config() {
    return this.source.config;
  }
}
class L extends j {
  constructor({ inColumns: e = [], inConfig: t = {}, inData: n = {} } = {}) {
    const a = e, s = t, l = n;
    super({
      inColumns: a,
      inConfig: s
    }), this.library = this._buildLibrary({
      inSource: this.source,
      inData: l
    });
  }
  _buildLibrary({ inSource: e, inData: t = {} } = {}) {
    var l, r;
    const n = e, a = t;
    return {
      activeColumns: this._resolveActiveColumns({
        inColumnsCatalog: n == null ? void 0 : n.columns,
        inColumnKeys: (r = (l = n == null ? void 0 : n.config) == null ? void 0 : l.body) == null ? void 0 : r.columns
      }),
      formData: a && typeof a == "object" ? a : {}
    };
  }
  get activeColumns() {
    return this.library.activeColumns;
  }
  get formData() {
    return this.library.formData || {};
  }
  updateData({ inData: e = {} } = {}) {
    const t = e;
    return this.library.formData = t && typeof t == "object" ? t : {}, this.library.formData;
  }
}
const $ = {
  version: "18.0.0",
  name: "json-to-spec/v18",
  description: "Minimalist 2-layer compiler: pure value replace + jsonToSpec iterate"
}, E = (o) => {
  typeof globalThis > "u" || !o || (globalThis.ks ?? (globalThis.ks = {}), globalThis.ks["json-to-spec"] = {
    meta: $,
    compile: o
  });
}, S = ({ inData: o, inDataKey: e }) => {
  const t = e;
  if (t === "") return o;
  let n = o[t];
  return t.includes(".") && (n = t.split(".").reduce(
    (l, r) => l == null ? void 0 : l[r],
    o
  )), n;
}, k = ({
  inNode: o,
  inData: e
} = {}) => {
  const t = o, n = e;
  if (!(t != null && t.textContent)) return "no-textContent";
  if (typeof t.textContent != "string") return "not-a-string";
  if (!t.textContent.includes("${")) return "no-template-token";
  const a = t.textContent.replace(/^\$\{/, "").replace(/\}$/, "");
  t.textContent = S({
    inData: n,
    inDataKey: a
  });
}, I = ({
  inNode: o,
  inData: e
} = {}) => {
  const t = o, n = e;
  if ("attributes" in t) {
    const a = Object.fromEntries(
      Object.entries(t.attributes || {}).map(([s, l]) => [
        s,
        typeof l == "string" && l.includes("${") ? S({
          inData: n,
          inDataKey: l.replace(/^\$\{/, "").replace(/\}$/, "")
        }) : l
      ])
    );
    t.attributes = { ...a };
  }
}, O = ({
  inNode: o,
  inData: e
} = {}) => {
  const t = o, n = e;
  k({ inNode: t, inData: n }), I({ inNode: t, inData: n });
}, V = ({
  inTemplate: o,
  inSourceValues: e
} = {}) => e.map((a) => {
  const s = structuredClone(o);
  return b({
    inNode: s,
    inData: a,
    inOperation: "replace"
  });
}), P = ({
  inNode: o,
  inData: e
} = {}) => {
  const t = o, n = e;
  if (!("jsonToSpec" in t) || !("operation" in t.jsonToSpec) || t.jsonToSpec.operation !== "iterate" || !("source" in t.jsonToSpec)) return;
  const a = n[t.jsonToSpec.source], s = V({
    inTemplate: t.jsonToSpec.template,
    inSourceValues: a
  });
  t.children = s;
}, C = ({ inNode: o, inData: e, inOperation: t }) => {
  const n = o, a = t;
  if (Array.isArray(n)) {
    const s = [];
    for (const l of n) {
      const r = b({
        inNode: l,
        inData: e,
        inOperation: a
      });
      Array.isArray(r) ? s.push(...r) : r != null && s.push(r);
    }
    return s;
  }
}, b = ({
  inNode: o,
  inData: e = {},
  inOperation: t
} = {}) => {
  const n = o, a = t;
  if (n == null)
    return n;
  if (Array.isArray(n))
    return C({
      inNode: n,
      inData: e,
      inOperation: a
    });
  if ("children" in n && Array.isArray(n == null ? void 0 : n.children) && (n.children = C({
    inNode: n == null ? void 0 : n.children,
    inData: e,
    inOperation: a
  })), typeof n != "object")
    return n;
  switch (a) {
    case "replace":
      typeof n == "object" && O({
        inNode: n,
        inData: e
      });
      break;
    case "iterateDo":
      P({
        inNode: n,
        inData: e
      });
  }
  return n;
}, T = ({ inStructureAsJson: o, inDataAsJson: e, inOperation: t }) => {
  try {
    return b({
      inNode: o,
      inData: e,
      inOperation: t
    });
  } catch (n) {
    throw console.error("[json-to-spec/v17] replace error:", n), n;
  }
}, R = {
  name: "json-to-spec/v18"
}, N = (o, e = {}, t = !1) => {
  let n = o, a = e;
  t && console.log(R.name, n, a);
  try {
    const s = T({
      inStructureAsJson: n,
      inDataAsJson: a,
      inOperation: "iterateDo"
    }), l = T({
      inStructureAsJson: s,
      inDataAsJson: a,
      inOperation: "replace"
    });
    return console.log("iteratedData : ", s, l), l;
  } catch (s) {
    throw console.error("[json-to-spec/v17] compile error:", s), s;
  }
};
E(N);
const B = {
  version: "v31.0",
  description: "Pure DOM engine (v31)"
}, H = (o) => {
  typeof globalThis > "u" || !o || (globalThis.ks ?? (globalThis.ks = {}), globalThis.ks["json-to-dom"] = {
    meta: B,
    buildSpecElement: o
  });
}, M = "./tags.schema.json", J = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "title",
    "role"
  ],
  childTags: []
}, K = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: [
    "type",
    "placeholder",
    "value",
    "name",
    "disabled",
    "readonly",
    "required",
    "list"
  ]
}, W = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: [
    "type",
    "checked",
    "name",
    "value",
    "disabled",
    "required"
  ]
}, q = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "for"
  ],
  childTags: []
}, z = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "action",
    "method",
    "autocomplete",
    "enctype",
    "name",
    "novalidate",
    "target"
  ],
  childTags: []
}, _ = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "name",
    "disabled",
    "required",
    "multiple",
    "size"
  ],
  childTags: [
    "option"
  ]
}, G = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, F = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, U = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, Q = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, X = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: [
    "src",
    "alt",
    "width",
    "height",
    "loading"
  ]
}, Y = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "type",
    "disabled",
    "name",
    "value"
  ],
  childTags: []
}, Z = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "border",
    "cellpadding",
    "cellspacing"
  ],
  childTags: [
    "caption",
    "colgroup",
    "thead",
    "tbody",
    "tfoot",
    "tr"
  ]
}, tt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, et = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, nt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, ot = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "td",
    "th"
  ]
}, at = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "scope",
    "colspan",
    "rowspan"
  ],
  childTags: []
}, st = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "colspan",
    "rowspan"
  ],
  childTags: []
}, rt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "option"
  ]
}, lt = {
  allowsTextContent: !0,
  allowsChildren: !1,
  allowedAttributes: [
    "value",
    "label",
    "selected",
    "disabled"
  ]
}, it = {
  $schema: M,
  div: J,
  input: K,
  checkbox: W,
  label: q,
  form: z,
  select: _,
  p: G,
  h1: F,
  h2: U,
  span: Q,
  img: X,
  button: Y,
  table: Z,
  thead: tt,
  tbody: et,
  tfoot: nt,
  tr: ot,
  th: at,
  td: st,
  datalist: rt,
  option: lt
}, ct = [
  "accesskey",
  "autocapitalize",
  "autofocus",
  "class",
  "contenteditable",
  "dir",
  "draggable",
  "enterkeyhint",
  "hidden",
  "id",
  "inert",
  "inputmode",
  "is",
  "itemid",
  "itemprop",
  "itemref",
  "itemscope",
  "itemtype",
  "lang",
  "nonce",
  "part",
  "popover",
  "role",
  "slot",
  "spellcheck",
  "style",
  "tabindex",
  "title",
  "translate"
], dt = [
  "data-",
  "aria-"
], A = {
  attributes: ct,
  wildcardPrefixes: dt
}, g = ({ inSpec: o, spec: e } = {}) => {
  var r;
  const t = o ?? e, n = [], a = [];
  if (!t || typeof t != "object")
    return n.push("Spec must be a non-null object"), { isValid: !1, errors: n, warnings: a };
  if (Array.isArray(t))
    return t.forEach((c, d) => {
      const i = g({ inSpec: c });
      i.isValid || n.push(...i.errors.map((u) => `[${d}] ${u}`)), a.push(...i.warnings.map((u) => `[${d}] ${u}`));
    }), { isValid: n.length === 0, errors: n, warnings: a };
  const s = (r = t.tagName) == null ? void 0 : r.toLowerCase();
  if (!s || typeof s != "string")
    return n.push("Missing or invalid 'tagName'"), { isValid: !1, errors: n, warnings: a };
  const l = it[s];
  if (!l)
    a.push(`Tag '<${s}>' is not recognized in tags.json`);
  else if (l.allowsChildren === !1 && Array.isArray(t.children) && t.children.length > 0 && n.push(`Void tag '<${s}>' cannot have children`), l.allowsTextContent === !1 && t.textContent && a.push(`Tag '<${s}>' does not normally allow direct textContent`), t.attributes && typeof t.attributes == "object") {
    const c = /* @__PURE__ */ new Set([
      ...A.attributes || [],
      ...l.allowedAttributes || []
    ]), d = A.wildcardPrefixes || [];
    for (const i of Object.keys(t.attributes)) {
      const u = d.some((m) => i.startsWith(m));
      !c.has(i) && !u && a.push(`Attribute '${i}' is not recognized on '<${s}>'`);
    }
  }
  return Array.isArray(t.children) && t.children.forEach((c, d) => {
    const i = g({ inSpec: c });
    i.isValid || n.push(...i.errors.map((u) => `<${s}>.children[${d}]: ${u}`)), a.push(...i.warnings.map((u) => `<${s}>.children[${d}]: ${u}`));
  }), {
    isValid: n.length === 0,
    errors: n,
    warnings: a
  };
}, ut = (o) => {
  var l;
  const e = o, t = e && typeof e == "object" && !Array.isArray(e) && ("spec" in e || "inSpec" in e), n = t ? e.inSpec ?? e.spec : e, a = t ? !!(e.inValidate ?? e.validate ?? e.debug) : !1, s = t ? !!(e.inShowLog ?? e.showLog) : !1;
  if (a && n) {
    const r = g({ inSpec: n });
    return r.isValid ? ((l = r.warnings) == null ? void 0 : l.length) > 0 && s && console.warn("[json-to-dom: validation warning]", r.warnings) : console.warn("[json-to-dom: validation error]", r.errors, r), r;
  }
  return { isValid: !0 };
}, pt = ({ inSpec: o }) => {
  const e = o;
  return e == null;
}, ft = ({ inSpec: o }) => typeof Node < "u" && o instanceof Node, mt = ({ inSpec: o }) => {
  const e = o;
  return Array.isArray(e);
}, ht = ({ inSpec: o }) => {
  const e = o;
  return typeof e == "object" && e !== null && !Array.isArray(e);
}, gt = ({ inSpec: o, inShowLog: e = !1 }) => {
  const t = o, n = e;
  return Array.isArray(t) ? t.map((a) => y({
    inSpec: a,
    inShowLog: n
  })).flat().filter(Boolean) : [];
}, bt = ({ inTagName: o }) => {
  const e = o == null ? void 0 : o.toLowerCase();
  if (!e) return null;
  if (e === "checkbox") {
    const t = document.createElement("input");
    return t.type = "checkbox", t;
  }
  return document.createElement(e);
}, yt = ({ inElement: o, inTextContent: e, inAllowsTextContent: t = !0, inTagName: n, inShowLog: a = !1 }) => {
  const s = o, l = e, r = t, c = n, d = a;
  return !s || l === void 0 || l === null ? s : r ? (s.textContent = l, s) : (d && console.warn(`[json-to-dom v11] textContent is not allowed on <${c}>; discarded "${l}"`), s);
}, wt = ({ inElement: o, inProperties: e }) => {
  const t = o, n = e;
  return t && n && typeof n == "object" && Object.assign(t, n), t;
}, Ct = ({ inElement: o, inAttributes: e }) => {
  const t = o, n = e;
  return !t || !n || typeof n != "object" || Object.entries(n).forEach(([a, s]) => {
    a === "class" ? t.className = s : typeof s == "boolean" ? s ? t.setAttribute(a, "") : t.removeAttribute(a) : s != null && t.setAttribute(a, String(s));
  }), t;
}, Tt = ({ inElement: o, inClassList: e }) => {
  const t = o, n = e;
  if (!t || !n) return t;
  let a = [];
  return typeof n == "string" ? a = n.split(/\s+/).filter(Boolean) : Array.isArray(n) && (a = n.filter((s) => typeof s == "string" && s.trim().length > 0)), a.length > 0 && t.classList.add(...a), t;
}, At = ({ inElement: o, inChildren: e, inAllowsChildren: t = !0, inTagName: n, inShowLog: a = !1 }) => {
  const s = o, l = e, r = t, c = n, d = a;
  return !s || !Array.isArray(l) || l.length === 0 ? s : r ? (l.forEach((i) => {
    typeof Node < "u" && i instanceof Node ? s.appendChild(i) : (typeof i == "string" || typeof i == "number") && s.appendChild(document.createTextNode(String(i)));
  }), s) : (d && console.warn(`[json-to-dom v11] Children are not allowed on void tag <${c}>; discarded ${l.length} child nodes.`), s);
}, St = ({ inSpec: o, inClassList: e }) => {
  const t = o, n = e || (t == null ? void 0 : t.classList);
  if (!t || !t.tagName) return null;
  const a = bt({ inTagName: t.tagName });
  return a ? (yt({
    inElement: a,
    inTextContent: t.textContent,
    inTagName: t.tagName
  }), wt({
    inElement: a,
    inProperties: t.properties
  }), Ct({
    inElement: a,
    inAttributes: t.attributes
  }), Tt({
    inElement: a,
    inClassList: n
  }), At({
    inElement: a,
    inChildren: t.children,
    inTagName: t.tagName
  }), a) : null;
}, Nt = ({ inChildren: o, inShowLog: e = !1 }) => {
  const t = o, n = e;
  return Array.isArray(t) ? t.map((a) => typeof a == "string" || typeof a == "number" ? typeof document < "u" ? document.createTextNode(String(a)) : String(a) : y({
    inSpec: a,
    inShowLog: n
  })).flat().filter(Boolean) : [];
}, vt = ({ inSpec: o, inShowLog: e = !1 }) => {
  const t = o, n = e;
  if (!(t != null && t.tagName))
    return n && console.warn("[json-to-dom v23] Missing tagName on spec:", t), null;
  const a = Array.isArray(t.children) && t.children.length > 0 ? Nt({
    inChildren: t.children,
    inShowLog: n
  }) : [];
  return St({
    inSpec: {
      ...t,
      children: a
    }
  });
}, y = ({ inSpec: o, inShowLog: e = !1 } = {}) => {
  const t = o, n = e;
  return pt({ inSpec: t }) ? null : ft({ inSpec: t }) ? t : mt({ inSpec: t }) ? gt({ inSpec: t, inShowLog: n }) : ht({ inSpec: t }) ? vt({ inSpec: t, inShowLog: n }) : null;
}, xt = ({ inArgs: o, inSpec: e, inShowLog: t } = {}) => {
  var c;
  const n = o, a = e, s = t;
  let l = a !== void 0 ? a : n, r = !!s;
  return n && typeof n == "object" && !Array.isArray(n) && !(typeof Node < "u" && n instanceof Node) && ("inSpec" in n ? (l = n.inSpec, r = !!n.inShowLog) : "spec" in n && (l = n.spec, r = !!n.showLog)), typeof globalThis < "u" && ((c = globalThis == null ? void 0 : globalThis.ks) != null && c.showLog) && (r = !0), {
    spec: l,
    showLog: r
  };
}, Dt = (o) => {
  const e = o, t = e && typeof e == "object" && !Array.isArray(e) && !(typeof Node < "u" && e instanceof Node) && ("spec" in e || "inSpec" in e), n = t ? e.spec ?? e.inSpec : e, a = t ? !!(e.showLog ?? e.inShowLog) : !1, { spec: s } = xt({ inSpec: n, inShowLog: a });
  return y({ inSpec: s, inShowLog: a });
}, jt = ({ element: o, targetHtmlId: e } = {}) => {
  const t = o, n = e;
  if (!n || typeof document > "u") return;
  const a = document.getElementById(n);
  a && (a.innerHTML = "", Array.isArray(t) ? t.forEach((s) => {
    s instanceof Node && a.appendChild(s);
  }) : t instanceof Node && a.appendChild(t));
}, Lt = (o = {}) => {
  const e = o, t = e.element, n = e.targetHtmlId;
  return n && typeof document < "u" && jt({ element: t, targetHtmlId: n }), t;
}, v = (o) => {
  ut(o);
  const e = Dt(o), t = (o == null ? void 0 : o.targetHtmlId) ?? (o == null ? void 0 : o.domIdToPushTo) ?? (o == null ? void 0 : o.inDomIdToPushTo);
  return Lt({ element: e, targetHtmlId: t });
};
H(v);
const $t = {
  tagName: "div",
  attributes: {
    class: "card shadow-sm"
  },
  children: [
    {
      tagName: "div",
      attributes: {
        class: "card-header fw-semibold"
      },
      children: [
        {
          tagName: "span",
          textContent: "Ledger Details"
        }
      ]
    },
    {
      tagName: "div",
      attributes: {
        class: "card-body"
      },
      jsonToSpec: {
        operation: "iterate",
        source: "fields",
        template: {
          tagName: "div",
          attributes: {
            class: "mb-3"
          },
          children: [
            {
              tagName: "label",
              attributes: {
                class: "form-label"
              },
              textContent: "${label}"
            },
            {
              tagName: "input",
              attributes: {
                type: "text",
                class: "form-control",
                value: "${value}",
                readonly: "true"
              }
            }
          ]
        }
      },
      children: []
    }
  ]
}, Et = {
  tagName: "div",
  attributes: {
    class: "card shadow-sm"
  },
  children: [
    {
      tagName: "div",
      attributes: {
        class: "card-header fw-semibold"
      },
      children: [
        {
          tagName: "span",
          textContent: "Ledger Details"
        }
      ]
    },
    {
      tagName: "div",
      attributes: {
        class: "card-body"
      },
      jsonToSpec: {
        operation: "iterate",
        source: "fields",
        template: {
          tagName: "div",
          attributes: {
            class: "row mb-2 align-items-center"
          },
          children: [
            {
              tagName: "label",
              attributes: {
                class: "col-4 col-form-label fw-medium text-end"
              },
              textContent: "${label}"
            },
            {
              tagName: "div",
              attributes: {
                class: "col-8"
              },
              children: [
                {
                  tagName: "input",
                  attributes: {
                    type: "text",
                    class: "form-control form-control-sm",
                    value: "${value}",
                    list: "${list}"
                  }
                }
              ]
            }
          ]
        }
      },
      children: []
    }
  ]
}, kt = {
  tagName: "div",
  attributes: {
    class: "card shadow-sm"
  },
  children: [
    {
      tagName: "div",
      attributes: {
        class: "card-header fw-semibold"
      },
      children: [
        {
          tagName: "span",
          textContent: "Ledger Details"
        }
      ]
    },
    {
      tagName: "div",
      attributes: {
        class: "card-body"
      },
      jsonToSpec: {
        operation: "iterate",
        source: "fields",
        template: {
          tagName: "div",
          attributes: {
            class: "row mb-2 align-items-center"
          },
          children: [
            {
              tagName: "label",
              attributes: {
                class: "col-4 col-form-label fw-medium text-end"
              },
              textContent: "${label}"
            },
            {
              tagName: "div",
              attributes: {
                class: "col-6"
              },
              children: [
                {
                  tagName: "input",
                  attributes: {
                    type: "text",
                    class: "form-control form-control-sm",
                    value: "${value}",
                    readonly: "true"
                  }
                }
              ]
            },
            {
              tagName: "div",
              attributes: {
                class: "col-2 d-flex gap-1"
              },
              children: [
                {
                  tagName: "button",
                  attributes: {
                    type: "button",
                    class: "btn btn-sm btn-outline-primary"
                  },
                  textContent: "Edit"
                },
                {
                  tagName: "button",
                  attributes: {
                    type: "button",
                    class: "btn btn-sm btn-outline-secondary"
                  },
                  textContent: "Copy"
                }
              ]
            }
          ]
        }
      },
      children: []
    }
  ]
}, It = {
  tagName: "div",
  attributes: {
    class: "card shadow-sm"
  },
  children: [
    {
      tagName: "div",
      attributes: {
        class: "card-header fw-semibold"
      },
      children: [
        {
          tagName: "span",
          textContent: "Ledger Details"
        }
      ]
    },
    {
      tagName: "ul",
      attributes: {
        class: "list-group list-group-flush"
      },
      jsonToSpec: {
        operation: "iterate",
        source: "fields",
        template: {
          tagName: "li",
          attributes: {
            class: "list-group-item d-flex justify-content-between align-items-center"
          },
          children: [
            {
              tagName: "span",
              attributes: {
                class: "text-muted"
              },
              textContent: "${label}"
            },
            {
              tagName: "span",
              attributes: {
                class: "fw-medium"
              },
              textContent: "${value}"
            }
          ]
        }
      },
      children: []
    }
  ]
}, Ot = {
  stacked: $t,
  inline: Et,
  inlineWithButtons: kt,
  list: It
}, Vt = ({ inForm: o } = {}) => {
  const e = o;
  return {
    render: ({ inContainerId: n, inContainer: a, targetContainerId: s } = {}) => {
      try {
        const r = Ot["inline"];
        let c = {};
        const d = e.store.library.activeColumns;
        c.fields = d;
        const i = N(r, c);
        return console.log("-----------localForm ------------: ", i, e, d), v({ spec: i, targetHtmlId: "table-container" });
      } catch (l) {
        console.log("error : ", l);
      }
    }
  };
}, Pt = ({ inForm: o } = {}) => {
  const e = o, t = async ({ inQuery: r = {} } = {}) => {
    var c, d;
    if (!(e != null && e.dataProvider) || typeof e.dataProvider.read != "function")
      return ((c = e == null ? void 0 : e.store) == null ? void 0 : c.formData) || {};
    try {
      const i = await e.dataProvider.read({ inQuery: r }), u = Array.isArray(i) ? i[0] : (i == null ? void 0 : i.data) || i || {};
      return e.store.updateData({ inData: u }), e.renderStructure(), u;
    } catch (i) {
      return console.error("[json-to-dom-form:load] Failed to load data via dataProvider:", i), ((d = e == null ? void 0 : e.store) == null ? void 0 : d.formData) || {};
    }
  }, n = ({ inData: r = {} } = {}) => (e.store.updateData({ inData: r }), e.renderStructure());
  return {
    load: t,
    update: n,
    getData: () => {
      if (!(e != null && e.formElement)) return {};
      const r = {}, c = (d) => {
        if (!(d instanceof Element)) return;
        const i = d.matches ? d.matches("input, select, textarea") ? [d] : [] : [], u = Array.from(d.querySelectorAll("input, select, textarea"));
        [...i, ...u].forEach((p) => {
          var h;
          if (p.name) {
            if (p instanceof HTMLInputElement && (p.type === "checkbox" || p.type === "radio")) {
              p.checked && (r[p.name] = p.value ?? !0);
              return;
            }
            if (p instanceof HTMLSelectElement && p.multiple) {
              r[p.name] = Array.from(p.selectedOptions).map((f) => f.value);
              return;
            }
            if (p instanceof HTMLInputElement && p.type === "file") {
              r[p.name] = (h = p.files) != null && h.length ? Array.from(p.files).map((f) => f.name) : "";
              return;
            }
            r[p.name] = p.value;
          }
        });
      };
      return e.formElement instanceof HTMLFormElement, c(e.formElement), r;
    },
    setData: ({ inData: r = {} } = {}) => n({ inData: r }),
    reset: () => {
      e != null && e.formElement && typeof e.formElement.reset == "function" && e.formElement.reset();
    }
  };
};
class Rt {
  constructor({
    data: e = {},
    columns: t = [],
    config: n = {},
    layout: a,
    theme: s,
    classes: l = {},
    dataProvider: r = null,
    targetContainerId: c = ""
  } = {}) {
    const d = e, i = t, u = n, m = a || (u == null ? void 0 : u.layout) || "stacked", p = s || (u == null ? void 0 : u.theme) || "default", h = l, f = r, x = c;
    this.containerId = x, this.layout = m, this.theme = p, this.customClasses = h, this.dataProvider = f, this.formElement = null, this.controlsTree = null, this.store = new L({
      inData: d,
      inColumns: i,
      inConfig: u
    }), this.methods = Vt({ inForm: this }), this.actions = Pt({ inForm: this });
  }
  render(e = {}) {
    return this.methods.render(e);
  }
  async load(e = {}) {
    return await this.actions.load(e);
  }
  update(e = {}) {
    return this.actions.update(e);
  }
  getData() {
    return this.actions.getData();
  }
  setData(e = {}) {
    return this.actions.setData(e);
  }
  reset() {
    return this.actions.reset();
  }
  getControlsTree() {
    return this.controlsTree;
  }
  get columns() {
    return this.store.activeColumns;
  }
  get config() {
    return this.store.config;
  }
  get data() {
    return this.store.formData;
  }
}
const Bt = "v10 .0.0";
window.ks ?? (window.ks = {});
window.ks["json-to-dom-form"] = {
  version: Bt,
  Form: Rt
};
export {
  Rt as Form,
  Rt as default,
  Bt as version
};
