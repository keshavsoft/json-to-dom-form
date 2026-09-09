const T = ({ inData: d = [], inColumns: t = [], inConfig: o = {}, inTopN: e } = {}) => {
  const r = d, n = t, i = o, s = e;
  return {
    originalData: Array.isArray(r) ? typeof structuredClone == "function" ? structuredClone(r) : JSON.parse(JSON.stringify(r)) : [],
    columns: Array.isArray(n) ? n : [],
    config: i || {},
    topN: s
  };
}, F = ({ inColumnsCatalog: d = [], inColumnKeys: t = [] } = {}) => {
  const o = d, e = t;
  if (Array.isArray(e) && e.length > 0) {
    const r = new Map((Array.isArray(o) ? o : []).map((s) => [s.key, s])), n = [], i = [];
    for (const s of e) {
      const c = r.get(s);
      c ? i.push(c) : n.push(s);
    }
    return n.length > 0 && console.warn(
      `[json-to-dom-renderers] Warning: Config requested columns [${n.map((s) => `"${s}"`).join(", ")}] that do not exist in the columns catalog.`
    ), i;
  }
  return Array.isArray(o) ? o : [];
};
class M {
  constructor({ inData: t = [], inColumns: o = [], inConfig: e = {}, inTopN: r } = {}) {
    const n = t, i = o, s = e, c = r;
    this.source = T({
      inData: n,
      inColumns: i,
      inConfig: s,
      inTopN: c
    });
  }
  _buildSource(t) {
    return T(t);
  }
  _resolveActiveColumns(t) {
    return F(t);
  }
  get rawData() {
    return this.source.originalData;
  }
  get config() {
    return this.source.config;
  }
}
class R extends M {
  constructor({ inColumns: t = [], inConfig: o = {}, inData: e = {} } = {}) {
    const r = t, n = o, i = e;
    super({
      inColumns: r,
      inConfig: n
    }), this.library = this._buildLibrary({
      inSource: this.source,
      inData: i
    });
  }
  _buildLibrary({ inSource: t, inData: o = {} } = {}) {
    var i, s;
    const e = t, r = o;
    return {
      activeColumns: this._resolveActiveColumns({
        inColumnsCatalog: e == null ? void 0 : e.columns,
        inColumnKeys: (s = (i = e == null ? void 0 : e.config) == null ? void 0 : i.body) == null ? void 0 : s.columns
      }),
      formData: r && typeof r == "object" ? r : {}
    };
  }
  get activeColumns() {
    return this.library.activeColumns;
  }
  get formData() {
    return this.library.formData || {};
  }
  updateData({ inData: t = {} } = {}) {
    const o = t;
    return this.library.formData = o && typeof o == "object" ? o : {}, this.library.formData;
  }
}
const O = {
  form: "",
  body: "d-flex flex-column gap-3",
  field: "col-12",
  label: "form-label mb-1",
  controlWrapper: "",
  group: "input-group input-group-sm w-100",
  input: "form-control",
  button: "btn",
  foot: "d-flex align-items-center justify-content-end gap-2 pt-3 mt-3 border-top"
}, P = {
  form: "",
  body: "d-flex flex-column gap-3",
  field: "row align-items-center g-2",
  label: "col-sm-4 col-form-label text-sm-end mb-0",
  controlWrapper: "col-sm-8",
  group: "input-group input-group-sm w-100",
  input: "form-control",
  button: "btn",
  foot: "d-flex align-items-center justify-content-end gap-2 pt-3 mt-3 border-top"
}, $ = {
  form: "mb-3",
  body: "row g-3 align-items-center",
  field: "col-auto d-flex align-items-center gap-2 mb-2",
  label: "col-form-label col-form-label-sm text-nowrap mb-0",
  controlWrapper: "",
  group: "input-group input-group-sm w-auto",
  input: "form-control",
  button: "btn",
  foot: "col-auto d-flex align-items-center gap-2 mt-2"
}, z = {
  form: "",
  body: "row g-3",
  field: "col-12",
  label: "form-label mb-1",
  controlWrapper: "",
  group: "input-group input-group-sm w-100",
  input: "form-control",
  button: "btn",
  foot: "col-12 d-flex align-items-center justify-content-end gap-2 pt-3 mt-3 border-top"
}, I = {
  stacked: O,
  horizontal: P,
  inline: $,
  grid: z,
  "grid-2col": {
    form: "",
    body: "row g-3",
    field: "col-md-6",
    label: "form-label mb-1",
    controlWrapper: "",
    group: "input-group input-group-sm w-100",
    input: "form-control",
    button: "btn",
    foot: "col-12 d-flex align-items-center justify-content-end gap-2 pt-3 mt-3 border-top"
  },
  "grid-3col": {
    form: "",
    body: "row g-3",
    field: "col-md-4",
    label: "form-label mb-1",
    controlWrapper: "",
    group: "input-group input-group-sm w-100",
    input: "form-control",
    button: "btn",
    foot: "col-12 d-flex align-items-center justify-content-end gap-2 pt-3 mt-3 border-top"
  }
}, K = {
  form: "bg-light p-3 rounded shadow-sm border",
  body: "",
  field: "",
  label: "fw-semibold text-secondary small",
  controlWrapper: "",
  group: "",
  input: "bg-white border-secondary border-opacity-25",
  button: "btn-outline-primary",
  foot: "border-secondary border-opacity-25"
}, _ = {
  form: "bg-transparent border-0 shadow-none",
  body: "",
  field: "",
  label: "text-muted small",
  controlWrapper: "",
  group: "",
  input: "bg-light border-light-subtle",
  button: "btn-light border",
  foot: "border-light-subtle"
}, q = {
  form: "card p-3 shadow-sm bg-dark text-light border-secondary",
  body: "",
  field: "",
  label: "fw-semibold text-light small",
  controlWrapper: "",
  group: "",
  input: "bg-dark text-light border-secondary",
  button: "btn-outline-light",
  foot: "border-secondary"
}, H = {
  form: "card p-3 shadow-sm bg-black text-light border-secondary border-opacity-50",
  body: "",
  field: "",
  label: "fw-bold text-white small",
  controlWrapper: "",
  group: "",
  input: "bg-dark text-white border-secondary",
  button: "btn-primary",
  foot: "border-secondary border-opacity-50"
}, E = {
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
  light: K,
  extraLight: _,
  dark: q,
  extraDark: H
}, G = ({ inForm: d, inTheme: t = "default" } = {}) => {
  var r, n;
  const o = d, e = t || "default";
  if (o && (o.theme = e, o.classes = C({
    inLayout: o.layout,
    inTheme: o.theme,
    inConfigClasses: (n = (r = o.store) == null ? void 0 : r.config) == null ? void 0 : n.classes,
    inCustomClasses: o.customClasses
  }), o.formElement))
    return o.render();
}, C = ({
  inLayout: d = "stacked",
  inTheme: t = "default",
  inConfigClasses: o = {},
  inCustomClasses: e = {}
} = {}) => {
  const r = d || "stacked", n = t || "default", i = o || {}, s = e || {}, c = I[r] || I.stacked || {}, a = E[n] || E.default || {}, b = /* @__PURE__ */ new Set([
    ...Object.keys(c),
    ...Object.keys(a),
    ...Object.keys(i),
    ...Object.keys(s)
  ]), u = {};
  for (const l of b) {
    const m = [
      c[l],
      a[l],
      i[l],
      s[l]
    ].filter(Boolean).join(" ").split(/\s+/).filter(Boolean);
    u[l] = Array.from(new Set(m)).join(" ");
  }
  return u;
}, J = ({ inForm: d, inLayout: t = "stacked" } = {}) => {
  var r, n;
  const o = d, e = t || "stacked";
  if (o && (o.layout = e, o.classes = C({
    inLayout: o.layout,
    inTheme: o.theme,
    inConfigClasses: (n = (r = o.store) == null ? void 0 : r.config) == null ? void 0 : n.classes,
    inCustomClasses: o.customClasses
  }), o.formElement))
    return o.render();
}, U = ({ inContainerConfig: d = null, inFormSpec: t = null, inClasses: o = {} } = {}) => {
  const e = d, r = t, n = o;
  if (!e)
    return r;
  const s = {
    class: (n == null ? void 0 : n.container) || (e == null ? void 0 : e.class) || "card shadow-sm border-0 mb-4"
  };
  e != null && e.id && (s.id = e.id);
  const c = [], a = e == null ? void 0 : e.header;
  if (a) {
    const l = (n == null ? void 0 : n.containerHeader) || (a == null ? void 0 : a.class) || "card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center", m = [], h = (a == null ? void 0 : a.title) || "Form", y = (a == null ? void 0 : a.icon) || "", w = (a == null ? void 0 : a.titleClass) || "fw-semibold text-secondary", g = [];
    if (y && g.push({
      tagName: "i",
      attributes: { class: `${y} me-1` }
    }), g.push({
      tagName: "span",
      textContent: h
    }), m.push({
      tagName: "div",
      attributes: { class: w },
      children: g
    }), Array.isArray(a == null ? void 0 : a.actions) && a.actions.length > 0) {
      const f = {
        tagName: "div",
        attributes: { class: "d-flex align-items-center gap-2" },
        children: a.actions.map((p) => {
          const x = [];
          p.icon && x.push({
            tagName: "i",
            attributes: { class: `${p.icon} me-1` }
          }), p.label && x.push({
            tagName: "span",
            textContent: p.label
          });
          const N = {
            type: p.type || "button",
            class: p.class || "btn btn-sm btn-outline-secondary"
          };
          return p.id && (N.id = p.id), p.title && (N.title = p.title), {
            tagName: "button",
            attributes: N,
            children: x
          };
        })
      };
      m.push(f);
    }
    c.push({
      tagName: "div",
      attributes: { class: l },
      children: m
    });
  }
  const b = (n == null ? void 0 : n.containerBody) || (e == null ? void 0 : e.bodyClass) || "card-body", u = r ? [r] : [];
  if (Array.isArray(e == null ? void 0 : e.extraControls) && u.push(...e.extraControls), c.push({
    tagName: "div",
    attributes: { class: b },
    children: u
  }), e != null && e.footer) {
    const l = e.footer, m = (n == null ? void 0 : n.containerFooter) || (l == null ? void 0 : l.class) || "card-footer bg-light py-2";
    c.push({
      tagName: "div",
      attributes: { class: m },
      textContent: l.text || ""
    });
  }
  return {
    tagName: "div",
    attributes: s,
    children: c
  };
}, Q = ({ inHeadConfig: d = {}, inClasses: t = {} } = {}) => {
  const o = d, e = t, r = (o == null ? void 0 : o.title) || "", n = (o == null ? void 0 : o.subtitle) || "";
  if (!r && !n) return null;
  const i = [];
  return r && i.push({
    tagName: "div",
    textContent: r,
    attributes: {
      class: (e == null ? void 0 : e.headTitle) || "h5 fw-bold mb-1"
    }
  }), n && i.push({
    tagName: "div",
    textContent: n,
    attributes: {
      class: (e == null ? void 0 : e.headSubtitle) || "text-muted small"
    }
  }), {
    tagName: "div",
    attributes: {
      class: (e == null ? void 0 : e.head) || (o == null ? void 0 : o.class) || "pb-2 mb-3 border-bottom"
    },
    children: i
  };
}, j = ({ inColumn: d = {}, inClasses: t = {}, inConfig: o = {} } = {}) => {
  var S, D, k;
  const e = d, r = t, n = o, i = e.key || "", s = e.label || i, c = e.type === "number" ? "number" : "text", a = ((S = n == null ? void 0 : n.control) == null ? void 0 : S.alignment) || (n == null ? void 0 : n.alignment) || ((n == null ? void 0 : n.layout) === "horizontal" ? "horizontal" : "stacked"), b = a === "horizontal" ? (r == null ? void 0 : r.label) || "col-sm-4 col-form-label text-sm-end mb-0" : (r == null ? void 0 : r.label) || "form-label mb-1", u = {
    tagName: "label",
    textContent: s,
    attributes: b ? { class: b } : {}
  }, l = e.datalist === !0 || e.datalist !== !1 && c !== "number", m = e.datalistId || `${i}-datalist`, h = {
    type: c,
    name: i,
    placeholder: `Enter ${s}...`
  };
  r != null && r.input && (h.class = r.input), l && (h.list = m);
  const y = {
    tagName: "input",
    attributes: h
  };
  e.id && (y.attributes.id = e.id, u.attributes.for = e.id);
  const w = ((D = n == null ? void 0 : n.control) == null ? void 0 : D.searchButtons) === !1 || (n == null ? void 0 : n.searchButtons) === !1 || e.searchButton === !1 || e.search === !1, g = ((k = n == null ? void 0 : n.control) == null ? void 0 : k.searchButtons) === !0 || (n == null ? void 0 : n.searchButtons) === !0 || e.searchButton === !0 || e.search === !0, f = !w && (g || !!e.searchId);
  let p;
  if (f) {
    const v = {
      tagName: "button",
      textContent: "Search",
      attributes: {
        type: "button",
        id: e.searchId || `${i}-search`,
        name: `${i}-search`,
        "data-key": i,
        class: (r == null ? void 0 : r.button) || "btn btn-outline-secondary"
      }
    };
    p = {
      tagName: "div",
      attributes: r != null && r.group ? { class: r.group } : {},
      children: [y, v]
    };
  } else
    p = y;
  r != null && r.controlWrapper && (p = {
    tagName: "div",
    attributes: { class: r.controlWrapper },
    children: [p]
  });
  let x = "";
  if (n != null && n.grid) {
    const v = typeof n.grid == "object" ? n.grid.columns || n.grid.cols : n.grid;
    v === 1 ? x = "col-12" : v === 2 ? x = "col-md-6" : v === 3 ? x = "col-md-4" : v === 4 && (x = "col-md-3");
  }
  const N = e.colClass || e.class || x || (r == null ? void 0 : r.field) || "";
  if (a === "horizontal") {
    const v = r != null && r.controlWrapper ? p : {
      tagName: "div",
      attributes: { class: "col-sm-8" },
      children: [p]
    };
    return {
      tagName: "div",
      attributes: N ? { class: N } : {},
      children: [{
        tagName: "div",
        attributes: { class: "row align-items-center g-2" },
        children: [u, v]
      }]
    };
  }
  return {
    tagName: "div",
    attributes: N ? { class: N } : {},
    children: [u, p]
  };
}, V = ({ inColumns: d = [], inConfig: t = {}, inClasses: o = {} } = {}) => {
  const e = d, r = t, n = o;
  if (!Array.isArray(e)) return { tagName: "div", children: [] };
  if (Array.isArray(r == null ? void 0 : r.sections) && r.sections.length > 0) {
    const a = /* @__PURE__ */ new Map();
    e.forEach((l) => {
      l && l.key && a.set(l.key, l);
    });
    const b = r.sections.map((l) => {
      const y = (Array.isArray(l.columns) ? l.columns : []).map((f) => typeof f == "string" ? a.get(f) || { key: f, label: f } : f).map((f) => j({ inColumn: f, inClasses: n, inConfig: r })), w = {
        tagName: "div",
        attributes: l.bodyClass ? { class: l.bodyClass } : n != null && n.sectionBody ? { class: n.sectionBody } : { class: "d-flex flex-column gap-3" },
        children: y
      };
      if (l.card) {
        const f = [];
        return l.title && f.push({
          tagName: "div",
          attributes: { class: "card-header bg-light py-2 fw-semibold d-flex align-items-center gap-2" },
          children: [
            ...l.icon ? [{ tagName: "i", attributes: { class: l.icon } }] : [],
            { tagName: "span", textContent: l.title }
          ]
        }), f.push({
          tagName: "div",
          attributes: { class: "card-body" },
          children: [w]
        }), {
          tagName: "div",
          attributes: { class: l.class || "col-md-6" },
          children: [
            {
              tagName: "div",
              attributes: { class: "card h-100 shadow-sm border-0" },
              children: f
            }
          ]
        };
      }
      const g = [];
      return l.title && g.push({
        tagName: "h6",
        attributes: { class: l.titleClass || "fw-bold text-secondary mb-3 pb-2 border-bottom d-flex align-items-center gap-2" },
        children: [
          ...l.icon ? [{ tagName: "i", attributes: { class: l.icon } }] : [],
          { tagName: "span", textContent: l.title }
        ]
      }), g.push(w), {
        tagName: "div",
        attributes: { class: l.class || "col-md-6" },
        children: g
      };
    });
    return {
      tagName: "div",
      attributes: {
        class: r.sectionsRowClass || "row g-4"
      },
      children: b
    };
  }
  const i = e.map((a) => j({ inColumn: a, inClasses: n, inConfig: r }));
  let s = (n == null ? void 0 : n.body) || "";
  return r != null && r.grid && (s = `row g-${typeof r.grid == "object" && r.grid.gap !== void 0 ? r.grid.gap : 3}`), {
    tagName: "div",
    attributes: s ? { class: s } : {},
    children: i
  };
}, X = ({ inFootConfig: d = {}, inClasses: t = {} } = {}) => {
  const o = d, e = t, r = o == null ? void 0 : o.buttons;
  if (!Array.isArray(r) || r.length === 0) return null;
  const n = r.map((s) => {
    const a = s.variant === "primary" ? "btn btn-primary" : (e == null ? void 0 : e.button) || "btn btn-outline-secondary", b = s.class || a, u = {
      type: s.type || "button",
      name: s.name || "",
      class: b
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
      class: (e == null ? void 0 : e.foot) || (o == null ? void 0 : o.class) || "d-flex align-items-center justify-content-end gap-2 pt-3 mt-3 border-top"
    },
    children: n
  };
}, W = ({ inColumns: d = [], inConfig: t = {}, inClasses: o = {} } = {}) => {
  const e = d, r = t, n = o, i = Q({ inHeadConfig: r == null ? void 0 : r.head, inClasses: n }), s = V({ inColumns: e, inConfig: r, inClasses: n }), c = X({ inFootConfig: r == null ? void 0 : r.foot, inClasses: n }), b = {
    tagName: "div",
    attributes: n != null && n.form ? { class: n.form } : {},
    children: [i, s, c].filter(Boolean)
  };
  return U({
    inContainerConfig: r == null ? void 0 : r.container,
    inFormSpec: b,
    inClasses: n
  });
}, Y = ({ inForm: d } = {}) => {
  const t = d;
  return t != null && t.store ? W({
    inColumns: t.store.activeColumns,
    inConfig: t.store.config,
    inClasses: t.classes
  }) : null;
}, A = ({ inSpec: d } = {}) => {
  var c, a, b;
  const t = d;
  if (!t || typeof t != "object") return null;
  if (Array.isArray(t)) {
    const u = t.map((l) => A({ inSpec: l })).filter(Boolean);
    return u.length > 0 ? u : null;
  }
  const e = (Array.isArray(t.children) ? t.children : []).map((u) => A({ inSpec: u })).filter(Boolean), r = ((c = t.attributes) == null ? void 0 : c.id) || t.id, n = !!r, i = e.length > 0;
  if (!n && !i)
    return null;
  const s = {
    tagName: t.tagName
  };
  return r && (s.id = r), (a = t.attributes) != null && a.name && (s.name = t.attributes.name), (b = t.attributes) != null && b.type && (s.type = t.attributes.type), t.attributes && (s.attributes = t.attributes), e.length > 0 && (s.children = e), s;
}, Z = ({ inForm: d, inContainerId: t, inContainer: o } = {}) => {
  var l, m;
  const e = d, r = t, n = o;
  if (!e)
    return console.error("[json-to-dom-renderers:Form] Form instance (inForm) is required to render."), {
      treeWithIds: null,
      spec: null,
      element: null,
      error: "Form instance (inForm) is required"
    };
  const i = W({
    inColumns: e.store.activeColumns,
    inConfig: e.store.config,
    inClasses: e.classes
  }), s = A({ inSpec: i }), c = (m = (l = window.ks) == null ? void 0 : l["json-to-dom"]) == null ? void 0 : m.buildSpecElement;
  if (typeof c != "function")
    return console.error("json-to-dom buildSpecElement not found on window.ks"), {
      treeWithIds: s,
      spec: i,
      element: null
    };
  const a = c({ inSpec: i }), b = Array.isArray(a) ? a[0] : a;
  let u = null;
  if (n instanceof HTMLElement)
    u = n;
  else {
    const h = r || e.containerId;
    h && (u = document.getElementById(h));
  }
  return u && (u.innerHTML = "", u.appendChild(b)), e.formElement = b, e.controlsTree = s, {
    treeWithIds: s,
    spec: i,
    element: b,
    store: e.store
  };
}, B = ({ inForm: d, inContainerId: t, inContainer: o, targetContainerId: e } = {}) => {
  const r = d, s = Z({
    inForm: r,
    inContainerId: t || e,
    inContainer: o
  });
  return s != null && s.element && (r.formElement = s.element, r.controlsTree = s.treeWithIds), s;
}, tt = async ({ inForm: d, inContainerId: t, inContainer: o, targetContainerId: e } = {}) => {
  const r = d, n = t || e, i = o;
  return r != null && r.dataProvider && (!r.store.formData || Object.keys(r.store.formData).length === 0) && await r.actions.load(), B({
    inForm: r,
    inContainerId: n,
    inContainer: i
  });
}, et = ({ inForm: d } = {}) => {
  const t = d;
  return {
    buildSpec: () => Y({ inForm: t }),
    renderStructure: ({ inContainerId: n, inContainer: i, targetContainerId: s } = {}) => {
      const c = B({
        inForm: t,
        inContainerId: n,
        inContainer: i,
        targetContainerId: s
      });
      return c != null && c.element && (t.formElement = c.element, t.controlsTree = c.treeWithIds), c;
    },
    render: async ({ inContainerId: n, inContainer: i, targetContainerId: s } = {}) => {
      const c = await tt({
        inForm: t,
        inContainerId: n,
        inContainer: i,
        targetContainerId: s
      });
      return c != null && c.element && (t.formElement = c.element, t.controlsTree = c.treeWithIds), c;
    }
  };
}, rt = ({ inForm: d } = {}) => {
  const t = d, o = async ({ inQuery: s = {} } = {}) => {
    var c, a;
    if (!(t != null && t.dataProvider) || typeof t.dataProvider.read != "function")
      return ((c = t == null ? void 0 : t.store) == null ? void 0 : c.formData) || {};
    try {
      const b = await t.dataProvider.read({ inQuery: s }), u = Array.isArray(b) ? b[0] : (b == null ? void 0 : b.data) || b || {};
      return t.store.updateData({ inData: u }), t.renderStructure(), u;
    } catch (b) {
      return console.error("[json-to-dom-form:load] Failed to load data via dataProvider:", b), ((a = t == null ? void 0 : t.store) == null ? void 0 : a.formData) || {};
    }
  }, e = ({ inData: s = {} } = {}) => (t.store.updateData({ inData: s }), t.renderStructure());
  return {
    load: o,
    update: e,
    getData: () => {
      if (!(t != null && t.formElement)) return {};
      const s = {}, c = (a) => {
        if (!(a instanceof Element)) return;
        const b = a.matches ? a.matches("input, select, textarea") ? [a] : [] : [], u = Array.from(a.querySelectorAll("input, select, textarea"));
        [...b, ...u].forEach((m) => {
          var h;
          if (m.name) {
            if (m instanceof HTMLInputElement && (m.type === "checkbox" || m.type === "radio")) {
              m.checked && (s[m.name] = m.value ?? !0);
              return;
            }
            if (m instanceof HTMLSelectElement && m.multiple) {
              s[m.name] = Array.from(m.selectedOptions).map((y) => y.value);
              return;
            }
            if (m instanceof HTMLInputElement && m.type === "file") {
              s[m.name] = (h = m.files) != null && h.length ? Array.from(m.files).map((y) => y.name) : "";
              return;
            }
            s[m.name] = m.value;
          }
        });
      };
      return t.formElement instanceof HTMLFormElement, c(t.formElement), s;
    },
    setData: ({ inData: s = {} } = {}) => e({ inData: s }),
    reset: () => {
      t != null && t.formElement && typeof t.formElement.reset == "function" && t.formElement.reset();
    }
  };
};
class nt {
  constructor({
    data: t = {},
    columns: o = [],
    config: e = {},
    layout: r,
    theme: n,
    classes: i = {},
    dataProvider: s = null,
    targetContainerId: c = ""
  } = {}) {
    const a = t, b = o, u = e, l = r || (u == null ? void 0 : u.layout) || "stacked", m = n || (u == null ? void 0 : u.theme) || "default", h = i, y = s, w = c;
    this.containerId = w, this.layout = l, this.theme = m, this.customClasses = h, this.classes = C({
      inLayout: this.layout,
      inTheme: this.theme,
      inConfigClasses: u == null ? void 0 : u.classes,
      inCustomClasses: this.customClasses
    }), this.dataProvider = y, this.formElement = null, this.controlsTree = null, this.store = new R({
      inData: a,
      inColumns: b,
      inConfig: u
    }), this.methods = et({ inForm: this }), this.actions = rt({ inForm: this }), this.spec = this.buildSpec();
  }
  setLayout({ inLayout: t, layout: o = "stacked" } = {}) {
    return J({ inForm: this, inLayout: t || o || "stacked" });
  }
  setTheme({ inTheme: t, theme: o = "default" } = {}) {
    return G({ inForm: this, inTheme: t || o || "default" });
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
const ot = "v4.0.0";
window.ks ?? (window.ks = {});
window.ks["json-to-dom-form"] = {
  version: ot,
  Form: nt
};
export {
  nt as Form,
  nt as default,
  ot as version
};
