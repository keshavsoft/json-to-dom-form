const w = ({ inData: a = [], inColumns: n = [], inConfig: t = {}, inTopN: o } = {}) => {
  const e = a, r = n, i = t, s = o;
  return {
    originalData: Array.isArray(e) ? typeof structuredClone == "function" ? structuredClone(e) : JSON.parse(JSON.stringify(e)) : [],
    columns: Array.isArray(r) ? r : [],
    config: i || {},
    topN: s
  };
}, N = ({ inColumnsCatalog: a = [], inColumnKeys: n = [] } = {}) => {
  const t = a, o = n;
  if (Array.isArray(o) && o.length > 0) {
    const e = new Map((Array.isArray(t) ? t : []).map((s) => [s.key, s])), r = [], i = [];
    for (const s of o) {
      const l = e.get(s);
      l ? i.push(l) : r.push(s);
    }
    return r.length > 0 && console.warn(
      `[json-to-dom-renderers] Warning: Config requested columns [${r.map((s) => `"${s}"`).join(", ")}] that do not exist in the columns catalog.`
    ), i;
  }
  return Array.isArray(t) ? t : [];
};
class v {
  constructor({ inData: n = [], inColumns: t = [], inConfig: o = {}, inTopN: e } = {}) {
    const r = n, i = t, s = o, l = e;
    this.source = w({
      inData: r,
      inColumns: i,
      inConfig: s,
      inTopN: l
    });
  }
  _buildSource(n) {
    return w(n);
  }
  _resolveActiveColumns(n) {
    return N(n);
  }
  get rawData() {
    return this.source.originalData;
  }
  get config() {
    return this.source.config;
  }
}
class T extends v {
  constructor({ inColumns: n = [], inConfig: t = {} } = {}) {
    const o = n, e = t;
    super({
      inColumns: o,
      inConfig: e
    }), this.library = this._buildLibrary({
      inSource: this.source
    });
  }
  _buildLibrary({ inSource: n } = {}) {
    var e, r;
    const t = n;
    return {
      activeColumns: this._resolveActiveColumns({
        inColumnsCatalog: t == null ? void 0 : t.columns,
        inColumnKeys: (r = (e = t == null ? void 0 : t.config) == null ? void 0 : e.body) == null ? void 0 : r.columns
      })
    };
  }
  get activeColumns() {
    return this.library.activeColumns;
  }
}
const S = ({ inHeadConfig: a = {}, inClasses: n = {} } = {}) => {
  const t = a, o = n, e = (t == null ? void 0 : t.title) || "", r = (t == null ? void 0 : t.subtitle) || "";
  if (!e && !r) return null;
  const i = [];
  return e && i.push({
    tagName: "div",
    textContent: e,
    attributes: {
      class: (o == null ? void 0 : o.headTitle) || "h5 fw-bold mb-1"
    }
  }), r && i.push({
    tagName: "div",
    textContent: r,
    attributes: {
      class: (o == null ? void 0 : o.headSubtitle) || "text-muted small"
    }
  }), {
    tagName: "div",
    attributes: {
      class: (o == null ? void 0 : o.head) || (t == null ? void 0 : t.class) || "pb-2 mb-3 border-bottom"
    },
    children: i
  };
}, j = ({ inColumn: a = {}, inClasses: n = {}, inConfig: t = {} } = {}) => {
  const o = a, e = n, r = t, i = o.key || "", s = o.label || i, l = o.type === "number" ? "number" : "text", c = {
    tagName: "label",
    textContent: s,
    attributes: e != null && e.label ? { class: e.label } : {}
  }, d = o.datalist === !0 || o.datalist !== !1 && l !== "number", u = o.datalistId || `${i}-datalist`, m = {
    type: l,
    name: i,
    placeholder: `Enter ${s}...`
  };
  e != null && e.input && (m.class = e.input), d && (m.list = u);
  const f = {
    tagName: "input",
    attributes: m
  };
  o.id && (f.attributes.id = o.id, c.attributes.for = o.id);
  const b = (r == null ? void 0 : r.searchButtons) === !1 || o.searchButton === !1 || o.search === !1, h = o.searchButton === !0 || o.search === !0 || (r == null ? void 0 : r.searchButtons) === !0, y = !b && (h || !!o.searchId);
  let p;
  if (y) {
    const g = {
      tagName: "button",
      textContent: "Search",
      attributes: {
        type: "button",
        id: o.searchId || `${i}-search`,
        name: `${i}-search`,
        "data-key": i,
        class: (e == null ? void 0 : e.button) || "btn btn-outline-secondary"
      }
    };
    p = {
      tagName: "div",
      attributes: e != null && e.group ? { class: e.group } : {},
      children: [f, g]
    };
  } else
    p = f;
  return e != null && e.controlWrapper && (p = {
    tagName: "div",
    attributes: { class: e.controlWrapper },
    children: [p]
  }), {
    tagName: "div",
    attributes: e != null && e.field ? { class: e.field } : {},
    children: [c, p]
  };
}, I = ({ inColumns: a = [], inConfig: n = {}, inClasses: t = {} } = {}) => {
  const o = a, e = n, r = t;
  if (!Array.isArray(o)) return { tagName: "div", children: [] };
  const i = o.map((l) => j({ inColumn: l, inClasses: r, inConfig: e }));
  return {
    tagName: "div",
    attributes: r != null && r.body ? { class: r.body } : {},
    children: i
  };
}, W = ({ inFootConfig: a = {}, inClasses: n = {} } = {}) => {
  const t = a, o = n, e = t == null ? void 0 : t.buttons;
  if (!Array.isArray(e) || e.length === 0) return null;
  const r = e.map((s) => {
    const c = s.variant === "primary" ? "btn btn-primary" : (o == null ? void 0 : o.button) || "btn btn-outline-secondary", d = s.class || c, u = {
      type: s.type || "button",
      name: s.name || "",
      class: d
    };
    return s.id && (u.id = s.id), {
      tagName: "button",
      textContent: s.label || s.name,
      attributes: u
    };
  });
  return {
    tagName: "div",
    attributes: {
      class: (o == null ? void 0 : o.foot) || (t == null ? void 0 : t.class) || "d-flex align-items-center justify-content-end gap-2 pt-3 mt-3 border-top"
    },
    children: r
  };
}, B = ({ inColumns: a = [], inConfig: n = {}, inClasses: t = {} } = {}) => {
  const o = a, e = n, r = t, i = S({ inHeadConfig: e == null ? void 0 : e.head, inClasses: r }), s = I({ inColumns: o, inConfig: e, inClasses: r }), l = W({ inFootConfig: e == null ? void 0 : e.foot, inClasses: r });
  return {
    tagName: "div",
    attributes: r != null && r.form ? { class: r.form } : {},
    children: [i, s, l].filter(Boolean)
  };
}, C = ({ inSpec: a } = {}) => {
  var l, c, d;
  const n = a;
  if (!n || typeof n != "object") return null;
  if (Array.isArray(n)) {
    const u = n.map((m) => C({ inSpec: m })).filter(Boolean);
    return u.length > 0 ? u : null;
  }
  const o = (Array.isArray(n.children) ? n.children : []).map((u) => C({ inSpec: u })).filter(Boolean), e = ((l = n.attributes) == null ? void 0 : l.id) || n.id, r = !!e, i = o.length > 0;
  if (!r && !i)
    return null;
  const s = {
    tagName: n.tagName
  };
  return e && (s.id = e), (c = n.attributes) != null && c.name && (s.name = n.attributes.name), (d = n.attributes) != null && d.type && (s.type = n.attributes.type), n.attributes && (s.attributes = n.attributes), o.length > 0 && (s.children = o), s;
}, F = ({ inForm: a } = {}) => {
  var c, d;
  const n = a;
  if (!n)
    return console.error("[json-to-dom-renderers:Form] Form instance (inForm) is required to render."), {
      treeWithIds: null,
      spec: null,
      element: null,
      error: "Form instance (inForm) is required"
    };
  const t = n.containerId, o = document.getElementById(t);
  if (!o)
    return console.error(`[json-to-dom-renderers:Form] Target container "#${t}" was not found in the DOM.`), {
      treeWithIds: null,
      spec: null,
      element: null,
      error: `Target container "#${t}" not found in DOM.`
    };
  const e = B({
    inColumns: n.store.activeColumns,
    inConfig: n.store.config,
    inClasses: n.classes
  }), r = C({ inSpec: e }), i = (d = (c = window.ks) == null ? void 0 : c["json-to-dom"]) == null ? void 0 : d.buildSpecElement;
  if (typeof i != "function")
    return console.error("json-to-dom buildSpecElement not found on window.ks"), {
      treeWithIds: r,
      spec: e,
      element: null
    };
  const s = i({ inSpec: e }), l = Array.isArray(s) ? s[0] : s;
  return o.innerHTML = "", o.appendChild(l), {
    treeWithIds: r,
    spec: e,
    element: l
  };
}, L = {
  form: "",
  body: "d-flex flex-column gap-3",
  field: "col-12",
  label: "form-label mb-1",
  controlWrapper: "",
  group: "input-group input-group-sm w-100",
  input: "form-control",
  button: "btn",
  foot: "d-flex align-items-center justify-content-end gap-2 pt-3 mt-3 border-top"
}, D = {
  form: "",
  body: "d-flex flex-column gap-3",
  field: "row align-items-center g-2",
  label: "col-sm-4 col-form-label text-sm-end mb-0",
  controlWrapper: "col-sm-8",
  group: "input-group input-group-sm w-100",
  input: "form-control",
  button: "btn",
  foot: "d-flex align-items-center justify-content-end gap-2 pt-3 mt-3 border-top"
}, E = {
  form: "mb-3",
  body: "row g-3 align-items-center",
  field: "col-auto d-flex align-items-center gap-2 mb-2",
  label: "col-form-label col-form-label-sm text-nowrap mb-0",
  controlWrapper: "",
  group: "input-group input-group-sm w-auto",
  input: "form-control",
  button: "btn",
  foot: "col-auto d-flex align-items-center gap-2 mt-2"
}, k = {
  stacked: L,
  horizontal: D,
  inline: E
}, O = {
  form: "bg-light p-3 rounded shadow-sm border",
  body: "",
  field: "",
  label: "fw-semibold text-secondary small",
  controlWrapper: "",
  group: "",
  input: "bg-white border-secondary border-opacity-25",
  button: "btn-outline-primary",
  foot: "border-secondary border-opacity-25"
}, $ = {
  form: "bg-transparent border-0 shadow-none",
  body: "",
  field: "",
  label: "text-muted small",
  controlWrapper: "",
  group: "",
  input: "bg-light border-light-subtle",
  button: "btn-light border",
  foot: "border-light-subtle"
}, M = {
  form: "card p-3 shadow-sm bg-dark text-light border-secondary",
  body: "",
  field: "",
  label: "fw-semibold text-light small",
  controlWrapper: "",
  group: "",
  input: "bg-dark text-light border-secondary",
  button: "btn-outline-light",
  foot: "border-secondary"
}, _ = {
  form: "card p-3 shadow-sm bg-black text-light border-secondary border-opacity-50",
  body: "",
  field: "",
  label: "fw-bold text-white small",
  controlWrapper: "",
  group: "",
  input: "bg-dark text-white border-secondary",
  button: "btn-primary",
  foot: "border-secondary border-opacity-50"
}, A = {
  default: {
    form: "",
    body: "",
    field: "",
    label: "fw-semibold text-secondary small",
    controlWrapper: "",
    group: "",
    input: "",
    button: "btn-outline-secondary",
    foot: ""
  },
  light: O,
  extraLight: $,
  dark: M,
  extraDark: _
}, K = ({ inForm: a, inTheme: n = "default" } = {}) => {
  var e, r;
  const t = a, o = n || "default";
  if (t && (t.theme = o, t.classes = x({
    inLayout: t.layout,
    inTheme: t.theme,
    inConfigClasses: (r = (e = t.store) == null ? void 0 : e.config) == null ? void 0 : r.classes,
    inCustomClasses: t.customClasses
  }), t.formElement))
    return t.render();
}, x = ({
  inLayout: a = "stacked",
  inTheme: n = "default",
  inConfigClasses: t = {},
  inCustomClasses: o = {}
} = {}) => {
  const e = a || "stacked", r = n || "default", i = t || {}, s = o || {}, l = k[e] || k.stacked || {}, c = A[r] || A.default || {}, d = /* @__PURE__ */ new Set([
    ...Object.keys(l),
    ...Object.keys(c),
    ...Object.keys(i),
    ...Object.keys(s)
  ]), u = {};
  for (const m of d) {
    const f = [
      l[m],
      c[m],
      i[m],
      s[m]
    ].filter(Boolean).join(" ").split(/\s+/).filter(Boolean);
    u[m] = Array.from(new Set(f)).join(" ");
  }
  return u;
}, q = ({ inForm: a, inLayout: n = "stacked" } = {}) => {
  var e, r;
  const t = a, o = n || "stacked";
  if (t && (t.layout = o, t.classes = x({
    inLayout: t.layout,
    inTheme: t.theme,
    inConfigClasses: (r = (e = t.store) == null ? void 0 : e.config) == null ? void 0 : r.classes,
    inCustomClasses: t.customClasses
  }), t.formElement))
    return t.render();
};
class z {
  constructor({
    columns: n = [],
    config: t = {},
    layout: o,
    theme: e,
    classes: r = {},
    targetContainerId: i = "form-container",
    inColumns: s,
    inConfig: l,
    inLayout: c,
    inTheme: d,
    inClasses: u,
    inTargetContainerId: m
  } = {}) {
    const f = s || n, b = l || t, h = c || o || (b == null ? void 0 : b.layout) || "stacked", y = d || e || (b == null ? void 0 : b.theme) || "default", p = u || r, g = m || i;
    this.containerId = g, this.layout = h, this.theme = y, this.customClasses = p, this.classes = x({
      inLayout: this.layout,
      inTheme: this.theme,
      inConfigClasses: b == null ? void 0 : b.classes,
      inCustomClasses: this.customClasses
    }), this.formElement = null, this.controlsTree = null, this.store = new T({
      inColumns: f,
      inConfig: b
    });
  }
  setLayout({ inLayout: n, layout: t = "stacked" } = {}) {
    return q({ inForm: this, inLayout: n || t || "stacked" });
  }
  setTheme({ inTheme: n, theme: t = "default" } = {}) {
    return K({ inForm: this, inTheme: n || t || "default" });
  }
  get columns() {
    return this.store.activeColumns;
  }
  get config() {
    return this.store.config;
  }
  render() {
    const n = F({ inForm: this });
    return n && (this.formElement = n.element, this.controlsTree = n.treeWithIds), n;
  }
  getControlsTree() {
    return this.controlsTree;
  }
}
const J = "v1.0.0";
window.ks ?? (window.ks = {});
window.ks["json-to-dom-form"] = {
  version: J,
  Form: z
};
export {
  z as Form,
  z as default,
  J as version
};
