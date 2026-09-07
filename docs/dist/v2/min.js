const v = ({ inData: c = [], inColumns: t = [], inConfig: n = {}, inTopN: o } = {}) => {
  const e = c, r = t, a = n, s = o;
  return {
    originalData: Array.isArray(e) ? typeof structuredClone == "function" ? structuredClone(e) : JSON.parse(JSON.stringify(e)) : [],
    columns: Array.isArray(r) ? r : [],
    config: a || {},
    topN: s
  };
}, j = ({ inColumnsCatalog: c = [], inColumnKeys: t = [] } = {}) => {
  const n = c, o = t;
  if (Array.isArray(o) && o.length > 0) {
    const e = new Map((Array.isArray(n) ? n : []).map((s) => [s.key, s])), r = [], a = [];
    for (const s of o) {
      const i = e.get(s);
      i ? a.push(i) : r.push(s);
    }
    return r.length > 0 && console.warn(
      `[json-to-dom-renderers] Warning: Config requested columns [${r.map((s) => `"${s}"`).join(", ")}] that do not exist in the columns catalog.`
    ), a;
  }
  return Array.isArray(n) ? n : [];
};
class I {
  constructor({ inData: t = [], inColumns: n = [], inConfig: o = {}, inTopN: e } = {}) {
    const r = t, a = n, s = o, i = e;
    this.source = v({
      inData: r,
      inColumns: a,
      inConfig: s,
      inTopN: i
    });
  }
  _buildSource(t) {
    return v(t);
  }
  _resolveActiveColumns(t) {
    return j(t);
  }
  get rawData() {
    return this.source.originalData;
  }
  get config() {
    return this.source.config;
  }
}
class W extends I {
  constructor({ inColumns: t = [], inConfig: n = {}, inData: o = {} } = {}) {
    const e = t, r = n, a = o;
    super({
      inColumns: e,
      inConfig: r
    }), this.library = this._buildLibrary({
      inSource: this.source,
      inData: a
    });
  }
  _buildLibrary({ inSource: t, inData: n = {} } = {}) {
    var a, s;
    const o = t, e = n;
    return {
      activeColumns: this._resolveActiveColumns({
        inColumnsCatalog: o == null ? void 0 : o.columns,
        inColumnKeys: (s = (a = o == null ? void 0 : o.config) == null ? void 0 : a.body) == null ? void 0 : s.columns
      }),
      formData: e && typeof e == "object" ? e : {}
    };
  }
  get activeColumns() {
    return this.library.activeColumns;
  }
  get formData() {
    return this.library.formData || {};
  }
  updateData({ inData: t = {} } = {}) {
    const n = t;
    return this.library.formData = n && typeof n == "object" ? n : {}, this.library.formData;
  }
}
const E = {
  form: "",
  body: "d-flex flex-column gap-3",
  field: "col-12",
  label: "form-label mb-1",
  controlWrapper: "",
  group: "input-group input-group-sm w-100",
  input: "form-control",
  button: "btn",
  foot: "d-flex align-items-center justify-content-end gap-2 pt-3 mt-3 border-top"
}, B = {
  form: "",
  body: "d-flex flex-column gap-3",
  field: "row align-items-center g-2",
  label: "col-sm-4 col-form-label text-sm-end mb-0",
  controlWrapper: "col-sm-8",
  group: "input-group input-group-sm w-100",
  input: "form-control",
  button: "btn",
  foot: "d-flex align-items-center justify-content-end gap-2 pt-3 mt-3 border-top"
}, L = {
  form: "mb-3",
  body: "row g-3 align-items-center",
  field: "col-auto d-flex align-items-center gap-2 mb-2",
  label: "col-form-label col-form-label-sm text-nowrap mb-0",
  controlWrapper: "",
  group: "input-group input-group-sm w-auto",
  input: "form-control",
  button: "btn",
  foot: "col-auto d-flex align-items-center gap-2 mt-2"
}, S = {
  stacked: E,
  horizontal: B,
  inline: L
}, F = {
  form: "bg-light p-3 rounded shadow-sm border",
  body: "",
  field: "",
  label: "fw-semibold text-secondary small",
  controlWrapper: "",
  group: "",
  input: "bg-white border-secondary border-opacity-25",
  button: "btn-outline-primary",
  foot: "border-secondary border-opacity-25"
}, O = {
  form: "bg-transparent border-0 shadow-none",
  body: "",
  field: "",
  label: "text-muted small",
  controlWrapper: "",
  group: "",
  input: "bg-light border-light-subtle",
  button: "btn-light border",
  foot: "border-light-subtle"
}, P = {
  form: "card p-3 shadow-sm bg-dark text-light border-secondary",
  body: "",
  field: "",
  label: "fw-semibold text-light small",
  controlWrapper: "",
  group: "",
  input: "bg-dark text-light border-secondary",
  button: "btn-outline-light",
  foot: "border-secondary"
}, $ = {
  form: "card p-3 shadow-sm bg-black text-light border-secondary border-opacity-50",
  body: "",
  field: "",
  label: "fw-bold text-white small",
  controlWrapper: "",
  group: "",
  input: "bg-dark text-white border-secondary",
  button: "btn-primary",
  foot: "border-secondary border-opacity-50"
}, x = {
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
  light: F,
  extraLight: O,
  dark: P,
  extraDark: $
}, R = ({ inForm: c, inTheme: t = "default" } = {}) => {
  var e, r;
  const n = c, o = t || "default";
  if (n && (n.theme = o, n.classes = D({
    inLayout: n.layout,
    inTheme: n.theme,
    inConfigClasses: (r = (e = n.store) == null ? void 0 : e.config) == null ? void 0 : r.classes,
    inCustomClasses: n.customClasses
  }), n.formElement))
    return n.render();
}, D = ({
  inLayout: c = "stacked",
  inTheme: t = "default",
  inConfigClasses: n = {},
  inCustomClasses: o = {}
} = {}) => {
  const e = c || "stacked", r = t || "default", a = n || {}, s = o || {}, i = S[e] || S.stacked || {}, u = x[r] || x.default || {}, l = /* @__PURE__ */ new Set([
    ...Object.keys(i),
    ...Object.keys(u),
    ...Object.keys(a),
    ...Object.keys(s)
  ]), d = {};
  for (const m of l) {
    const b = [
      i[m],
      u[m],
      a[m],
      s[m]
    ].filter(Boolean).join(" ").split(/\s+/).filter(Boolean);
    d[m] = Array.from(new Set(b)).join(" ");
  }
  return d;
}, M = ({ inForm: c, inLayout: t = "stacked" } = {}) => {
  var e, r;
  const n = c, o = t || "stacked";
  if (n && (n.layout = o, n.classes = D({
    inLayout: n.layout,
    inTheme: n.theme,
    inConfigClasses: (r = (e = n.store) == null ? void 0 : e.config) == null ? void 0 : r.classes,
    inCustomClasses: n.customClasses
  }), n.formElement))
    return n.render();
}, _ = ({ inHeadConfig: c = {}, inClasses: t = {} } = {}) => {
  const n = c, o = t, e = (n == null ? void 0 : n.title) || "", r = (n == null ? void 0 : n.subtitle) || "";
  if (!e && !r) return null;
  const a = [];
  return e && a.push({
    tagName: "div",
    textContent: e,
    attributes: {
      class: (o == null ? void 0 : o.headTitle) || "h5 fw-bold mb-1"
    }
  }), r && a.push({
    tagName: "div",
    textContent: r,
    attributes: {
      class: (o == null ? void 0 : o.headSubtitle) || "text-muted small"
    }
  }), {
    tagName: "div",
    attributes: {
      class: (o == null ? void 0 : o.head) || (n == null ? void 0 : n.class) || "pb-2 mb-3 border-bottom"
    },
    children: a
  };
}, K = ({ inColumn: c = {}, inClasses: t = {}, inConfig: n = {} } = {}) => {
  const o = c, e = t, r = n, a = o.key || "", s = o.label || a, i = o.type === "number" ? "number" : "text", u = {
    tagName: "label",
    textContent: s,
    attributes: e != null && e.label ? { class: e.label } : {}
  }, l = o.datalist === !0 || o.datalist !== !1 && i !== "number", d = o.datalistId || `${a}-datalist`, m = {
    type: i,
    name: a,
    placeholder: `Enter ${s}...`
  };
  e != null && e.input && (m.class = e.input), l && (m.list = d);
  const b = {
    tagName: "input",
    attributes: m
  };
  o.id && (b.attributes.id = o.id, u.attributes.for = o.id);
  const p = (r == null ? void 0 : r.searchButtons) === !1 || o.searchButton === !1 || o.search === !1, y = o.searchButton === !0 || o.search === !0 || (r == null ? void 0 : r.searchButtons) === !0, f = !p && (y || !!o.searchId);
  let h;
  if (f) {
    const g = {
      tagName: "button",
      textContent: "Search",
      attributes: {
        type: "button",
        id: o.searchId || `${a}-search`,
        name: `${a}-search`,
        "data-key": a,
        class: (e == null ? void 0 : e.button) || "btn btn-outline-secondary"
      }
    };
    h = {
      tagName: "div",
      attributes: e != null && e.group ? { class: e.group } : {},
      children: [b, g]
    };
  } else
    h = b;
  return e != null && e.controlWrapper && (h = {
    tagName: "div",
    attributes: { class: e.controlWrapper },
    children: [h]
  }), {
    tagName: "div",
    attributes: e != null && e.field ? { class: e.field } : {},
    children: [u, h]
  };
}, q = ({ inColumns: c = [], inConfig: t = {}, inClasses: n = {} } = {}) => {
  const o = c, e = t, r = n;
  if (!Array.isArray(o)) return { tagName: "div", children: [] };
  const a = o.map((i) => K({ inColumn: i, inClasses: r, inConfig: e }));
  return {
    tagName: "div",
    attributes: r != null && r.body ? { class: r.body } : {},
    children: a
  };
}, z = ({ inFootConfig: c = {}, inClasses: t = {} } = {}) => {
  const n = c, o = t, e = n == null ? void 0 : n.buttons;
  if (!Array.isArray(e) || e.length === 0) return null;
  const r = e.map((s) => {
    const u = s.variant === "primary" ? "btn btn-primary" : (o == null ? void 0 : o.button) || "btn btn-outline-secondary", l = s.class || u, d = {
      type: s.type || "button",
      name: s.name || "",
      class: l
    };
    return s.id && (d.id = s.id), {
      tagName: "button",
      textContent: s.label || s.name,
      attributes: d
    };
  });
  return {
    tagName: "div",
    attributes: {
      class: (o == null ? void 0 : o.foot) || (n == null ? void 0 : n.class) || "d-flex align-items-center justify-content-end gap-2 pt-3 mt-3 border-top"
    },
    children: r
  };
}, k = ({ inColumns: c = [], inConfig: t = {}, inClasses: n = {} } = {}) => {
  const o = c, e = t, r = n, a = _({ inHeadConfig: e == null ? void 0 : e.head, inClasses: r }), s = q({ inColumns: o, inConfig: e, inClasses: r }), i = z({ inFootConfig: e == null ? void 0 : e.foot, inClasses: r });
  return {
    tagName: "div",
    attributes: r != null && r.form ? { class: r.form } : {},
    children: [a, s, i].filter(Boolean)
  };
}, G = ({ inForm: c } = {}) => {
  const t = c;
  return t != null && t.store ? k({
    inColumns: t.store.activeColumns,
    inConfig: t.store.config,
    inClasses: t.classes
  }) : null;
}, C = ({ inSpec: c } = {}) => {
  var i, u, l;
  const t = c;
  if (!t || typeof t != "object") return null;
  if (Array.isArray(t)) {
    const d = t.map((m) => C({ inSpec: m })).filter(Boolean);
    return d.length > 0 ? d : null;
  }
  const o = (Array.isArray(t.children) ? t.children : []).map((d) => C({ inSpec: d })).filter(Boolean), e = ((i = t.attributes) == null ? void 0 : i.id) || t.id, r = !!e, a = o.length > 0;
  if (!r && !a)
    return null;
  const s = {
    tagName: t.tagName
  };
  return e && (s.id = e), (u = t.attributes) != null && u.name && (s.name = t.attributes.name), (l = t.attributes) != null && l.type && (s.type = t.attributes.type), t.attributes && (s.attributes = t.attributes), o.length > 0 && (s.children = o), s;
}, J = ({ inForm: c } = {}) => {
  var u, l;
  const t = c;
  if (!t)
    return console.error("[json-to-dom-renderers:Form] Form instance (inForm) is required to render."), {
      treeWithIds: null,
      spec: null,
      element: null,
      error: "Form instance (inForm) is required"
    };
  const n = t.containerId, o = document.getElementById(n);
  if (!o)
    return console.error(`[json-to-dom-renderers:Form] Target container "#${n}" was not found in the DOM.`), {
      treeWithIds: null,
      spec: null,
      element: null,
      error: `Target container "#${n}" not found in DOM.`
    };
  const e = k({
    inColumns: t.store.activeColumns,
    inConfig: t.store.config,
    inClasses: t.classes
  }), r = C({ inSpec: e }), a = (l = (u = window.ks) == null ? void 0 : u["json-to-dom"]) == null ? void 0 : l.buildSpecElement;
  if (typeof a != "function")
    return console.error("json-to-dom buildSpecElement not found on window.ks"), {
      treeWithIds: r,
      spec: e,
      element: null
    };
  const s = a({ inSpec: e }), i = Array.isArray(s) ? s[0] : s;
  return o.innerHTML = "", o.appendChild(i), {
    treeWithIds: r,
    spec: e,
    element: i
  };
}, A = ({ inForm: c, inContainerId: t, inContainer: n, targetContainerId: o } = {}) => {
  const e = c, r = J({
    inForm: e
  });
  return r != null && r.element && (e.formElement = r.element, e.controlsTree = r.treeWithIds), r;
}, U = async ({ inForm: c, inContainerId: t, inContainer: n, targetContainerId: o } = {}) => {
  const e = c, r = t || o, a = n;
  return e != null && e.dataProvider && (!e.store.formData || Object.keys(e.store.formData).length === 0) && await e.actions.load(), A({
    inForm: e,
    inContainerId: r,
    inContainer: a
  });
}, Q = ({ inForm: c } = {}) => {
  const t = c;
  return {
    buildSpec: () => G({ inForm: t }),
    renderStructure: ({ inContainerId: r, inContainer: a, targetContainerId: s } = {}) => {
      const i = A({
        inForm: t,
        inContainerId: r,
        inContainer: a,
        targetContainerId: s
      });
      return i != null && i.element && (t.formElement = i.element, t.controlsTree = i.treeWithIds), i;
    },
    render: async ({ inContainerId: r, inContainer: a, targetContainerId: s } = {}) => {
      const i = await U({
        inForm: t,
        inContainerId: r,
        inContainer: a,
        targetContainerId: s
      });
      return i != null && i.element && (t.formElement = i.element, t.controlsTree = i.treeWithIds), i;
    }
  };
}, V = ({ inForm: c } = {}) => {
  const t = c, n = async ({ inQuery: s = {} } = {}) => {
    var i, u;
    if (!(t != null && t.dataProvider) || typeof t.dataProvider.read != "function")
      return ((i = t == null ? void 0 : t.store) == null ? void 0 : i.formData) || {};
    try {
      const l = await t.dataProvider.read({ inQuery: s }), d = Array.isArray(l) ? l[0] : (l == null ? void 0 : l.data) || l || {};
      return t.store.updateData({ inData: d }), t.renderStructure(), d;
    } catch (l) {
      return console.error("[json-to-dom-form:load] Failed to load data via dataProvider:", l), ((u = t == null ? void 0 : t.store) == null ? void 0 : u.formData) || {};
    }
  }, o = ({ inData: s = {} } = {}) => (t.store.updateData({ inData: s }), t.renderStructure());
  return {
    load: n,
    update: o,
    getData: () => {
      if (!(t != null && t.formElement)) return {};
      const s = new FormData(t.formElement);
      return Object.fromEntries(s.entries());
    },
    setData: ({ inData: s = {} } = {}) => o({ inData: s }),
    reset: () => {
      t != null && t.formElement && typeof t.formElement.reset == "function" && t.formElement.reset();
    }
  };
};
class X {
  constructor({
    columns: t = [],
    config: n = {},
    layout: o,
    theme: e,
    classes: r = {},
    dataProvider: a = null,
    targetContainerId: s = "form-container",
    inColumns: i,
    inConfig: u,
    inLayout: l,
    inTheme: d,
    inClasses: m,
    inDataProvider: b,
    inTargetContainerId: p
  } = {}) {
    const y = i || t, f = u || n, h = l || o || (f == null ? void 0 : f.layout) || "stacked", g = d || e || (f == null ? void 0 : f.theme) || "default", w = m || r, N = b || a, T = p || s;
    this.containerId = T, this.layout = h, this.theme = g, this.customClasses = w, this.classes = D({
      inLayout: this.layout,
      inTheme: this.theme,
      inConfigClasses: f == null ? void 0 : f.classes,
      inCustomClasses: this.customClasses
    }), this.dataProvider = N, this.formElement = null, this.controlsTree = null, this.store = new W({
      inColumns: y,
      inConfig: f
    }), this.methods = Q({ inForm: this }), this.actions = V({ inForm: this }), this.spec = this.buildSpec();
  }
  setLayout({ inLayout: t, layout: n = "stacked" } = {}) {
    return M({ inForm: this, inLayout: t || n || "stacked" });
  }
  setTheme({ inTheme: t, theme: n = "default" } = {}) {
    return R({ inForm: this, inTheme: t || n || "default" });
  }
  buildSpec() {
    return this.methods.buildSpec();
  }
  renderStructure(t = {}) {
    return this.methods.renderStructure(t);
  }
  async render(t = {}) {
    return await this.methods.render(t);
  }
  async load(t = {}) {
    return await this.actions.load(t);
  }
  update(t = {}) {
    return this.actions.update(t);
  }
  getData() {
    return this.actions.getData();
  }
  setData(t = {}) {
    return this.actions.setData(t);
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
const Y = "v2.0.0";
window.ks ?? (window.ks = {});
window.ks["json-to-dom-form"] = {
  version: Y,
  Form: X
};
export {
  X as Form,
  X as default,
  Y as version
};
