const w = ({ inData: r = [], inColumns: t = [], inConfig: e = {}, inTopN: o } = {}) => {
  const s = r, l = t, a = e, n = o;
  return {
    originalData: Array.isArray(s) ? typeof structuredClone == "function" ? structuredClone(s) : JSON.parse(JSON.stringify(s)) : [],
    columns: Array.isArray(l) ? l : [],
    config: a || {},
    topN: n
  };
}, S = ({ inColumnsCatalog: r = [], inColumnKeys: t = [] } = {}) => {
  const e = r, o = t;
  if (Array.isArray(o) && o.length > 0) {
    const s = new Map((Array.isArray(e) ? e : []).map((n) => [n.key, n])), l = [], a = [];
    for (const n of o) {
      const i = s.get(n);
      i ? a.push(i) : l.push(n);
    }
    return l.length > 0 && console.warn(
      `[json-to-dom-renderers] Warning: Config requested columns [${l.map((n) => `"${n}"`).join(", ")}] that do not exist in the columns catalog.`
    ), a;
  }
  return Array.isArray(e) ? e : [];
};
class k {
  constructor({ inData: t = [], inColumns: e = [], inConfig: o = {}, inTopN: s } = {}) {
    const l = t, a = e, n = o, i = s;
    this.source = w({
      inData: l,
      inColumns: a,
      inConfig: n,
      inTopN: i
    });
  }
  _buildSource(t) {
    return w(t);
  }
  _resolveActiveColumns(t) {
    return S(t);
  }
  get rawData() {
    return this.source.originalData;
  }
  get config() {
    return this.source.config;
  }
}
class D extends k {
  constructor({ inColumns: t = [], inConfig: e = {}, inData: o = {} } = {}) {
    const s = t, l = e, a = o;
    super({
      inColumns: s,
      inConfig: l
    }), this.library = this._buildLibrary({
      inSource: this.source,
      inData: a
    });
  }
  _buildLibrary({ inSource: t, inData: e = {} } = {}) {
    var a, n;
    const o = t, s = e;
    return {
      activeColumns: this._resolveActiveColumns({
        inColumnsCatalog: o == null ? void 0 : o.columns,
        inColumnKeys: (n = (a = o == null ? void 0 : o.config) == null ? void 0 : a.body) == null ? void 0 : n.columns
      }),
      formData: s && typeof s == "object" ? s : {}
    };
  }
  get activeColumns() {
    return this.library.activeColumns;
  }
  get formData() {
    return this.library.formData || {};
  }
  updateData({ inData: t = {} } = {}) {
    const e = t;
    return this.library.formData = e && typeof e == "object" ? e : {}, this.library.formData;
  }
}
const L = {
  form: "",
  body: "d-flex flex-column gap-3",
  field: "col-12",
  label: "form-label mb-1",
  controlWrapper: "",
  group: "input-group input-group-sm w-100",
  input: "form-control",
  button: "btn",
  foot: "pt-3 mt-3 border-top",
  footRows: "d-flex flex-column gap-2",
  footRow: "d-flex align-items-center justify-content-end gap-2 flex-wrap"
}, j = {
  form: "",
  body: "d-flex flex-column gap-3",
  field: "row align-items-center g-2",
  label: "col-sm-4 col-form-label text-sm-end mb-0",
  controlWrapper: "col-sm-8",
  group: "input-group input-group-sm w-100",
  input: "form-control",
  button: "btn",
  foot: "pt-3 mt-3 border-top",
  footRows: "d-flex flex-column gap-2",
  footRow: "d-flex align-items-center justify-content-end gap-2 flex-wrap"
}, R = {
  form: "mb-3",
  body: "row g-3 align-items-center",
  field: "col-auto d-flex align-items-center gap-2 mb-2",
  label: "col-form-label col-form-label-sm text-nowrap mb-0",
  controlWrapper: "",
  group: "input-group input-group-sm w-auto",
  input: "form-control",
  button: "btn",
  foot: "mt-2",
  footRows: "d-flex flex-column gap-2",
  footRow: "d-flex align-items-center gap-2 flex-wrap"
}, T = {
  form: "",
  body: "row g-3",
  field: "col-12",
  label: "form-label mb-1",
  controlWrapper: "",
  group: "input-group input-group-sm w-100",
  input: "form-control",
  button: "btn",
  foot: "col-12 pt-3 mt-3 border-top",
  footRows: "d-flex flex-column gap-2",
  footRow: "d-flex align-items-center justify-content-end gap-2 flex-wrap"
}, x = {
  stacked: L,
  horizontal: j,
  inline: R,
  grid: T,
  "grid-2col": {
    form: "",
    body: "row g-3",
    field: "col-md-6",
    label: "form-label mb-1",
    controlWrapper: "",
    group: "input-group input-group-sm w-100",
    input: "form-control",
    button: "btn",
    foot: "col-12 pt-3 mt-3 border-top",
    footRows: "d-flex flex-column gap-2",
    footRow: "d-flex align-items-center justify-content-end gap-2 flex-wrap"
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
    foot: "col-12 pt-3 mt-3 border-top",
    footRows: "d-flex flex-column gap-2",
    footRow: "d-flex align-items-center justify-content-end gap-2 flex-wrap"
  }
}, E = {
  form: "bg-light p-3 rounded shadow-sm border",
  body: "",
  field: "",
  label: "fw-semibold text-secondary small",
  controlWrapper: "",
  group: "",
  input: "bg-white border-secondary border-opacity-25",
  button: "btn-outline-primary",
  foot: "border-secondary border-opacity-25",
  footRows: "",
  footRow: ""
}, I = {
  form: "bg-transparent border-0 shadow-none",
  body: "",
  field: "",
  label: "text-muted small",
  controlWrapper: "",
  group: "",
  input: "bg-light border-light-subtle",
  button: "btn-light border",
  foot: "border-light-subtle",
  footRows: "",
  footRow: ""
}, W = {
  form: "card p-3 shadow-sm bg-dark text-light border-secondary",
  body: "",
  field: "",
  label: "fw-semibold text-light small",
  controlWrapper: "",
  group: "",
  input: "bg-dark text-light border-secondary",
  button: "btn-outline-light",
  foot: "border-secondary",
  footRows: "",
  footRow: ""
}, P = {
  form: "card p-3 shadow-sm bg-black text-light border-secondary border-opacity-50",
  body: "",
  field: "",
  label: "fw-bold text-white small",
  controlWrapper: "",
  group: "",
  input: "bg-dark text-white border-secondary",
  button: "btn-primary",
  foot: "border-secondary border-opacity-50",
  footRows: "",
  footRow: ""
}, N = {
  default: {
    form: "",
    body: "",
    field: "",
    label: "fw-semibold text-secondary small",
    controlWrapper: "",
    group: "",
    input: "",
    button: "btn-outline-secondary",
    foot: "",
    footRows: "",
    footRow: ""
  },
  light: E,
  extraLight: I,
  dark: W,
  extraDark: P
}, F = ({ inForm: r, inTheme: t = "default" } = {}) => {
  var s, l;
  const e = r, o = t || "default";
  if (e && (e.theme = o, e.classes = g({
    inLayout: e.layout,
    inTheme: e.theme,
    inConfigClasses: (l = (s = e.store) == null ? void 0 : s.config) == null ? void 0 : l.classes,
    inCustomClasses: e.customClasses
  }), e.formElement))
    return e.render();
}, g = ({
  inLayout: r = "stacked",
  inTheme: t = "default",
  inConfigClasses: e = {},
  inCustomClasses: o = {}
} = {}) => {
  const s = r || "stacked", l = t || "default", a = e || {}, n = o || {}, i = x[s] || x.stacked || {}, m = N[l] || N.default || {}, u = /* @__PURE__ */ new Set([
    ...Object.keys(i),
    ...Object.keys(m),
    ...Object.keys(a),
    ...Object.keys(n)
  ]), c = {};
  for (const b of u) {
    const d = [
      i[b],
      m[b],
      a[b],
      n[b]
    ].filter(Boolean).join(" ").split(/\s+/).filter(Boolean);
    c[b] = Array.from(new Set(d)).join(" ");
  }
  return c;
}, O = ({ inForm: r, inLayout: t = "stacked" } = {}) => {
  var s, l;
  const e = r, o = t || "stacked";
  if (e && (e.layout = o, e.classes = g({
    inLayout: e.layout,
    inTheme: e.theme,
    inConfigClasses: (l = (s = e.store) == null ? void 0 : s.config) == null ? void 0 : l.classes,
    inCustomClasses: e.customClasses
  }), e.formElement))
    return e.render();
}, B = ({ inContainerConfig: r = null, inClasses: t = {} } = {}) => {
  const e = r, o = t, l = { class: (o == null ? void 0 : o.container) || (e == null ? void 0 : e.class) || "card shadow-sm border-0 mb-4" };
  e != null && e.id && (l.id = e.id);
  const a = (e == null ? void 0 : e.header) || null, n = (o == null ? void 0 : o.containerHeader) || (a == null ? void 0 : a.class) || "card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center", i = (a == null ? void 0 : a.titleClass) || "fw-semibold text-secondary", m = (o == null ? void 0 : o.containerBody) || (e == null ? void 0 : e.bodyClass) || "card-body", u = (e == null ? void 0 : e.footer) || null, c = (o == null ? void 0 : o.containerFooter) || (u == null ? void 0 : u.class) || "card-footer bg-light py-2";
  return {
    attributes: l,
    header: a ? {
      config: a,
      class: n,
      titleText: a.title || "Form",
      titleClass: i,
      iconClass: a.icon || "",
      actions: Array.isArray(a.actions) ? a.actions : []
    } : null,
    bodyClass: m,
    extraControls: Array.isArray(e == null ? void 0 : e.extraControls) ? e.extraControls : [],
    footer: u ? {
      config: u,
      class: c,
      text: u.text || ""
    } : null
  };
}, M = ({ inActionConfig: r = {} } = {}) => {
  const t = r, e = [];
  t.icon && e.push({
    tagName: "i",
    attributes: { class: `${t.icon} me-1` }
  }), t.label && e.push({
    tagName: "span",
    textContent: t.label
  });
  const o = {
    type: t.type || "button",
    class: t.class || "btn btn-sm btn-outline-secondary"
  };
  return t.id && (o.id = t.id), t.title && (o.title = t.title), {
    tagName: "button",
    attributes: o,
    children: e
  };
}, H = ({ inHeaderPlan: r = {} } = {}) => {
  const t = r, e = [], o = [];
  return t.iconClass && o.push({
    tagName: "i",
    attributes: { class: `${t.iconClass} me-1` }
  }), o.push({
    tagName: "span",
    textContent: t.titleText
  }), e.push({
    tagName: "div",
    attributes: { class: t.titleClass },
    children: o
  }), t.actions.length > 0 && e.push({
    tagName: "div",
    attributes: { class: "d-flex align-items-center gap-2" },
    children: t.actions.map(
      (s) => M({ inActionConfig: s })
    )
  }), {
    tagName: "div",
    attributes: { class: t.class },
    children: e
  };
}, K = ({ inContainerPlan: r = {}, inFormSpec: t = null } = {}) => {
  const e = r, o = t, s = o ? [o] : [];
  return e.extraControls.length > 0 && s.push(...e.extraControls), {
    tagName: "div",
    attributes: { class: e.bodyClass },
    children: s
  };
}, V = ({ inFooterPlan: r = {} } = {}) => {
  const t = r;
  return {
    tagName: "div",
    attributes: { class: t.class },
    textContent: t.text
  };
}, _ = ({ inContainerConfig: r = null, inFormSpec: t = null, inClasses: e = {} } = {}) => {
  const o = r, s = t, l = e;
  if (!o)
    return s;
  const a = B({ inContainerConfig: o, inClasses: l }), n = [];
  return a.header && n.push(H({ inHeaderPlan: a.header })), n.push(K({ inContainerPlan: a, inFormSpec: s })), a.footer && n.push(V({ inFooterPlan: a.footer })), {
    tagName: "div",
    attributes: a.attributes,
    children: n
  };
}, q = ({ inHeadConfig: r = {}, inClasses: t = {} } = {}) => {
  const e = r, o = t, s = (e == null ? void 0 : e.title) || "", l = (e == null ? void 0 : e.subtitle) || "";
  if (!s && !l) return null;
  const a = [];
  return s && a.push({
    tagName: "div",
    textContent: s,
    attributes: {
      class: (o == null ? void 0 : o.headTitle) || "h5 fw-bold mb-1"
    }
  }), l && a.push({
    tagName: "div",
    textContent: l,
    attributes: {
      class: (o == null ? void 0 : o.headSubtitle) || "text-muted small"
    }
  }), {
    tagName: "div",
    attributes: {
      class: (o == null ? void 0 : o.head) || (e == null ? void 0 : e.class) || "pb-2 mb-3 border-bottom"
    },
    children: a
  };
}, $ = (r) => Array.isArray(r == null ? void 0 : r.buttons) && r.buttons.length > 0, z = ({ inFootConfig: r = {} } = {}) => Array.isArray(r == null ? void 0 : r.rows) ? r.rows.filter($) : Array.isArray(r == null ? void 0 : r.buttons) && r.buttons.length > 0 ? [{ buttons: r.buttons }] : [], h = (...r) => Array.from(new Set(
  r.filter(Boolean).join(" ").split(/\s+/).filter(Boolean)
)).join(" "), G = ({ inFootConfig: r = {}, inClasses: t = {} } = {}) => {
  const e = (t == null ? void 0 : t.foot) || "pt-3 mt-3 border-top", o = (t == null ? void 0 : t.footRows) || "d-flex flex-column gap-2", s = (t == null ? void 0 : t.footRow) || "d-flex align-items-center justify-content-end gap-2 flex-wrap";
  return {
    attributes: {
      class: h(e, r == null ? void 0 : r.class)
    },
    rowsClass: h(o, r == null ? void 0 : r.rowsClass),
    rowClass: s,
    buttonClass: (t == null ? void 0 : t.button) || "btn btn-outline-secondary",
    rows: z({ inFootConfig: r })
  };
}, J = ({ inButtonConfig: r = {}, inFootPlan: t = {} } = {}) => {
  const o = r.variant === "primary" ? "btn btn-primary" : t.buttonClass, s = r.class || o, l = {
    type: r.type || "button",
    name: r.name || "",
    class: s
  };
  return r.id && (l.id = r.id), {
    tagName: "button",
    textContent: r.label || r.name,
    attributes: l
  };
}, U = ({ inRowConfig: r = {}, inFootPlan: t = {} } = {}) => {
  if (!("buttons" in r))
    return console.error("[json-to-dom-form:buildFootRowNode] inRowConfig must contain 'buttons' key"), null;
  if (!Array.isArray(r.buttons))
    return console.error("[json-to-dom-form:buildFootRowNode] inRowConfig.buttons must be an array"), null;
  if (r.buttons.length === 0)
    return console.error("[json-to-dom-form:buildFootRowNode] inRowConfig.buttons must not be empty"), null;
  const e = h(t.rowClass, r.class);
  return {
    tagName: "div",
    attributes: e ? { class: e } : {},
    children: r.buttons.map((o) => J({
      inButtonConfig: o,
      inFootPlan: t
    }))
  };
}, Q = ({ inFootPlan: r = {} } = {}) => "rows" in r ? Array.isArray(r.rows) ? r.rows.length === 0 ? (console.error("[json-to-dom-form:buildFootRowsNode] inFootPlan.rows must not be empty"), null) : {
  tagName: "div",
  attributes: r.rowsClass ? { class: r.rowsClass } : {},
  children: r.rows.map((t) => U({
    inRowConfig: t,
    inFootPlan: r
  }))
} : (console.error("[json-to-dom-form:buildFootRowsNode] inFootPlan.rows must be an array"), null) : (console.error("[json-to-dom-form:buildFootRowsNode] inFootPlan must contain 'rows' key"), null), X = ({ inFootConfig: r = {}, inClasses: t = {} } = {}) => {
  const e = G({ inFootConfig: r, inClasses: t });
  return e.rows.length === 0 ? null : {
    tagName: "div",
    attributes: e.attributes,
    children: [Q({ inFootPlan: e })]
  };
}, Y = {
  formVerticalCreate: {
    tagName: "div",
    attributes: {
      class: "row align-items-center g-2"
    },
    children: [
      {
        tagName: "div",
        attributes: {
          class: "row align-items-center g-2"
        },
        children: [
          {
            tagName: "label",
            textContent: "Ledger Name",
            attributes: {
              class: "col-sm-4 col-form-label text-sm-end mb-0 fw-semibold text-secondary small"
            }
          },
          {
            tagName: "div",
            attributes: {
              class: "col-sm-8"
            },
            children: [
              {
                tagName: "input",
                attributes: {
                  type: "string",
                  name: "LedgerName",
                  placeholder: "Enter Ledger Name...",
                  class: "form-control",
                  list: "LedgerName-datalist"
                }
              }
            ]
          }
        ]
      }
    ]
  },
  formVerticalCreateCompact: {
    tagName: "div",
    attributes: {
      class: "row align-items-center g-2"
    },
    children: [
      {
        tagName: "div",
        attributes: {
          class: "row align-items-center g-2"
        },
        children: [
          {
            tagName: "label",
            textContent: "Ledger Name",
            attributes: {
              class: "col-sm-4 col-form-label text-sm-end mb-0 fw-semibold text-secondary small"
            }
          },
          {
            tagName: "div",
            attributes: {
              class: "col-sm-8"
            },
            children: [
              {
                tagName: "input",
                attributes: {
                  type: "string",
                  name: "LedgerName",
                  placeholder: "Enter Ledger Name...",
                  class: "form-control form-control-sm",
                  list: "LedgerName-datalist"
                }
              }
            ]
          }
        ]
      }
    ]
  }
}, Z = {
  formVerticalCreate: {
    body: {
      row: {
        tagName: "div",
        attributes: {
          class: "flex items-center gap-3 w-full mb-2"
        },
        children: [
          {
            tagName: "div",
            attributes: {
              class: "flex items-center gap-3 w-full"
            },
            children: [
              {
                tagName: "label",
                textContent: "Ledger Name",
                attributes: {
                  class: "w-36 shrink-0 text-right text-sm font-medium text-gray-600"
                }
              },
              {
                tagName: "div",
                attributes: {
                  class: "flex-1"
                },
                children: [
                  {
                    tagName: "input",
                    attributes: {
                      type: "text",
                      name: "LedgerName",
                      placeholder: "Enter Ledger Name...",
                      class: "w-full rounded border border-gray-300 px-2.5 py-1.5 text-sm text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
                      list: "LedgerName-datalist"
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    foot: {
      button: {
        simple: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      }
    }
  },
  formVerticalCreateCompact: {
    body: {
      row: {
        tagName: "div",
        attributes: {
          class: "flex items-center gap-1.5 w-full mb-0.5"
        },
        children: [
          {
            tagName: "div",
            attributes: {
              class: "flex items-center gap-1.5 w-full"
            },
            children: [
              {
                tagName: "label",
                textContent: "Ledger Name",
                attributes: {
                  class: "w-24 shrink-0 text-right text-[11px] font-medium text-gray-500"
                }
              },
              {
                tagName: "div",
                attributes: {
                  class: "flex-1"
                },
                children: [
                  {
                    tagName: "input",
                    attributes: {
                      type: "text",
                      name: "LedgerName",
                      placeholder: "Enter Ledger Name...",
                      class: "w-full rounded border border-gray-300 px-1.5 py-0.5 text-[11px] text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
                      list: "LedgerName-datalist"
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  }
}, tt = {
  bs5: Y,
  tailwind: Z
}, et = ({ inColumns: r = [], inConfig: t, inSpecKey: e = "formVerticalCreate" } = {}) => {
  const l = t.body.specKey.split(".").reduce(
    (n, i) => n == null ? void 0 : n[i],
    tt
  );
  return r.map((n) => {
    let i = structuredClone(l);
    return i.children[0].children[0].textContent = n.label, i.children[0].children[0].attributes.for = n.key, i.children[0].children[1].children[0].attributes.name = n.key, i.children[0].children[1].children[0].attributes.type = n == null ? void 0 : n.type, i;
  });
}, v = ({ inColumns: r = [], inConfig: t = {}, inClasses: e = {} } = {}) => {
  const o = r, s = t, l = e, a = q({ inHeadConfig: s == null ? void 0 : s.head, inClasses: l }), n = X({ inFootConfig: s == null ? void 0 : s.foot, inClasses: l }), i = et({
    inColumns: o,
    inConfig: s
  });
  console.log("body : ", i);
  const u = {
    tagName: "div",
    attributes: l != null && l.form ? { class: l.form } : {},
    children: [a, i, n].filter(Boolean)
  };
  return _({
    inContainerConfig: s == null ? void 0 : s.container,
    inFormSpec: u,
    inClasses: l
  });
}, rt = ({ inForm: r } = {}) => {
  const t = r;
  return t != null && t.store ? v({
    inColumns: t.store.activeColumns,
    inConfig: t.store.config,
    inClasses: t.classes
  }) : null;
}, y = ({ inSpec: r } = {}) => {
  var i, m, u;
  const t = r;
  if (!t || typeof t != "object") return null;
  if (Array.isArray(t)) {
    const c = t.map((b) => y({ inSpec: b })).filter(Boolean);
    return c.length > 0 ? c : null;
  }
  const o = (Array.isArray(t.children) ? t.children : []).map((c) => y({ inSpec: c })).filter(Boolean), s = ((i = t.attributes) == null ? void 0 : i.id) || t.id, l = !!s, a = o.length > 0;
  if (!l && !a)
    return null;
  const n = {
    tagName: t.tagName
  };
  return s && (n.id = s), (m = t.attributes) != null && m.name && (n.name = t.attributes.name), (u = t.attributes) != null && u.type && (n.type = t.attributes.type), t.attributes && (n.attributes = t.attributes), o.length > 0 && (n.children = o), n;
}, ot = ({ inForm: r, inContainerId: t, inContainer: e } = {}) => {
  var b, d;
  const o = r, s = t, l = e;
  if (!o)
    return console.error("[json-to-dom-renderers:Form] Form instance (inForm) is required to render."), {
      treeWithIds: null,
      spec: null,
      element: null,
      error: "Form instance (inForm) is required"
    };
  const a = v({
    inColumns: o.store.activeColumns,
    inConfig: o.store.config,
    inClasses: o.classes
  }), n = y({ inSpec: a }), i = (d = (b = window.ks) == null ? void 0 : b["json-to-dom"]) == null ? void 0 : d.buildSpecElement;
  if (typeof i != "function")
    return console.error("json-to-dom buildSpecElement not found on window.ks"), {
      treeWithIds: n,
      spec: a,
      element: null
    };
  const m = i({ inSpec: a }), u = Array.isArray(m) ? m[0] : m;
  let c = null;
  if (l instanceof HTMLElement)
    c = l;
  else {
    const f = s || o.containerId;
    f && (c = document.getElementById(f));
  }
  return c && (c.innerHTML = "", c.appendChild(u)), o.formElement = u, o.controlsTree = n, {
    treeWithIds: n,
    spec: a,
    element: u,
    store: o.store
  };
}, C = ({ inForm: r, inContainerId: t, inContainer: e, targetContainerId: o } = {}) => {
  const s = r, n = ot({
    inForm: s,
    inContainerId: t || o,
    inContainer: e
  });
  return n != null && n.element && (s.formElement = n.element, s.controlsTree = n.treeWithIds), n;
}, nt = async ({ inForm: r, inContainerId: t, inContainer: e, targetContainerId: o } = {}) => {
  const s = r, l = t || o, a = e;
  return s != null && s.dataProvider && (!s.store.formData || Object.keys(s.store.formData).length === 0) && await s.actions.load(), C({
    inForm: s,
    inContainerId: l,
    inContainer: a
  });
}, st = ({ inForm: r } = {}) => {
  const t = r;
  return {
    buildSpec: () => rt({ inForm: t }),
    renderStructure: ({ inContainerId: l, inContainer: a, targetContainerId: n } = {}) => {
      const i = C({
        inForm: t,
        inContainerId: l,
        inContainer: a,
        targetContainerId: n
      });
      return i != null && i.element && (t.formElement = i.element, t.controlsTree = i.treeWithIds), i;
    },
    render: async ({ inContainerId: l, inContainer: a, targetContainerId: n } = {}) => {
      const i = await nt({
        inForm: t,
        inContainerId: l,
        inContainer: a,
        targetContainerId: n
      });
      return i != null && i.element && (t.formElement = i.element, t.controlsTree = i.treeWithIds), i;
    }
  };
}, at = ({ inForm: r } = {}) => {
  const t = r, e = async ({ inQuery: n = {} } = {}) => {
    var i, m;
    if (!(t != null && t.dataProvider) || typeof t.dataProvider.read != "function")
      return ((i = t == null ? void 0 : t.store) == null ? void 0 : i.formData) || {};
    try {
      const u = await t.dataProvider.read({ inQuery: n }), c = Array.isArray(u) ? u[0] : (u == null ? void 0 : u.data) || u || {};
      return t.store.updateData({ inData: c }), t.renderStructure(), c;
    } catch (u) {
      return console.error("[json-to-dom-form:load] Failed to load data via dataProvider:", u), ((m = t == null ? void 0 : t.store) == null ? void 0 : m.formData) || {};
    }
  }, o = ({ inData: n = {} } = {}) => (t.store.updateData({ inData: n }), t.renderStructure());
  return {
    load: e,
    update: o,
    getData: () => {
      if (!(t != null && t.formElement)) return {};
      const n = {}, i = (m) => {
        if (!(m instanceof Element)) return;
        const u = m.matches ? m.matches("input, select, textarea") ? [m] : [] : [], c = Array.from(m.querySelectorAll("input, select, textarea"));
        [...u, ...c].forEach((d) => {
          var f;
          if (d.name) {
            if (d instanceof HTMLInputElement && (d.type === "checkbox" || d.type === "radio")) {
              d.checked && (n[d.name] = d.value ?? !0);
              return;
            }
            if (d instanceof HTMLSelectElement && d.multiple) {
              n[d.name] = Array.from(d.selectedOptions).map((p) => p.value);
              return;
            }
            if (d instanceof HTMLInputElement && d.type === "file") {
              n[d.name] = (f = d.files) != null && f.length ? Array.from(d.files).map((p) => p.name) : "";
              return;
            }
            n[d.name] = d.value;
          }
        });
      };
      return t.formElement instanceof HTMLFormElement, i(t.formElement), n;
    },
    setData: ({ inData: n = {} } = {}) => o({ inData: n }),
    reset: () => {
      t != null && t.formElement && typeof t.formElement.reset == "function" && t.formElement.reset();
    }
  };
};
class lt {
  constructor({
    data: t = {},
    columns: e = [],
    config: o = {},
    layout: s,
    theme: l,
    classes: a = {},
    dataProvider: n = null,
    targetContainerId: i = ""
  } = {}) {
    const m = t, u = e, c = o, b = s || (c == null ? void 0 : c.layout) || "stacked", d = l || (c == null ? void 0 : c.theme) || "default", f = a, p = n, A = i;
    this.containerId = A, this.layout = b, this.theme = d, this.customClasses = f, this.classes = g({
      inLayout: this.layout,
      inTheme: this.theme,
      inConfigClasses: c == null ? void 0 : c.classes,
      inCustomClasses: this.customClasses
    }), this.dataProvider = p, this.formElement = null, this.controlsTree = null, this.store = new D({
      inData: m,
      inColumns: u,
      inConfig: c
    }), this.methods = st({ inForm: this }), this.actions = at({ inForm: this }), this.spec = this.buildSpec();
  }
  setLayout({ inLayout: t, layout: e = "stacked" } = {}) {
    return O({ inForm: this, inLayout: t || e || "stacked" });
  }
  setTheme({ inTheme: t, theme: e = "default" } = {}) {
    return F({ inForm: this, inTheme: t || e || "default" });
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
const it = "v10 .0.0";
window.ks ?? (window.ks = {});
window.ks["json-to-dom-form"] = {
  version: it,
  Form: lt
};
export {
  lt as Form,
  lt as default,
  it as version
};
