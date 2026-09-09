const S = ({ inData: e = [], inColumns: t = [], inConfig: r = {}, inTopN: o } = {}) => {
  const s = e, a = t, u = r, n = o;
  return {
    originalData: Array.isArray(s) ? typeof structuredClone == "function" ? structuredClone(s) : JSON.parse(JSON.stringify(s)) : [],
    columns: Array.isArray(a) ? a : [],
    config: u || {},
    topN: n
  };
}, B = ({ inColumnsCatalog: e = [], inColumnKeys: t = [] } = {}) => {
  const r = e, o = t;
  if (Array.isArray(o) && o.length > 0) {
    const s = new Map((Array.isArray(r) ? r : []).map((n) => [n.key, n])), a = [], u = [];
    for (const n of o) {
      const l = s.get(n);
      l ? u.push(l) : a.push(n);
    }
    return a.length > 0 && console.warn(
      `[json-to-dom-renderers] Warning: Config requested columns [${a.map((n) => `"${n}"`).join(", ")}] that do not exist in the columns catalog.`
    ), u;
  }
  return Array.isArray(r) ? r : [];
};
class W {
  constructor({ inData: t = [], inColumns: r = [], inConfig: o = {}, inTopN: s } = {}) {
    const a = t, u = r, n = o, l = s;
    this.source = S({
      inData: a,
      inColumns: u,
      inConfig: n,
      inTopN: l
    });
  }
  _buildSource(t) {
    return S(t);
  }
  _resolveActiveColumns(t) {
    return B(t);
  }
  get rawData() {
    return this.source.originalData;
  }
  get config() {
    return this.source.config;
  }
}
class M extends W {
  constructor({ inColumns: t = [], inConfig: r = {}, inData: o = {} } = {}) {
    const s = t, a = r, u = o;
    super({
      inColumns: s,
      inConfig: a
    }), this.library = this._buildLibrary({
      inSource: this.source,
      inData: u
    });
  }
  _buildLibrary({ inSource: t, inData: r = {} } = {}) {
    var u, n;
    const o = t, s = r;
    return {
      activeColumns: this._resolveActiveColumns({
        inColumnsCatalog: o == null ? void 0 : o.columns,
        inColumnKeys: (n = (u = o == null ? void 0 : o.config) == null ? void 0 : u.body) == null ? void 0 : n.columns
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
    const r = t;
    return this.library.formData = r && typeof r == "object" ? r : {}, this.library.formData;
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
  foot: "pt-3 mt-3 border-top",
  footRows: "d-flex flex-column gap-2",
  footRow: "d-flex align-items-center justify-content-end gap-2 flex-wrap"
}, H = {
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
}, $ = {
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
}, z = {
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
}, k = {
  stacked: O,
  horizontal: H,
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
}, _ = {
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
}, q = {
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
}, K = {
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
}, G = {
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
}, D = {
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
  light: _,
  extraLight: q,
  dark: K,
  extraDark: G
}, J = ({ inForm: e, inTheme: t = "default" } = {}) => {
  var s, a;
  const r = e, o = t || "default";
  if (r && (r.theme = o, r.classes = A({
    inLayout: r.layout,
    inTheme: r.theme,
    inConfigClasses: (a = (s = r.store) == null ? void 0 : s.config) == null ? void 0 : a.classes,
    inCustomClasses: r.customClasses
  }), r.formElement))
    return r.render();
}, A = ({
  inLayout: e = "stacked",
  inTheme: t = "default",
  inConfigClasses: r = {},
  inCustomClasses: o = {}
} = {}) => {
  const s = e || "stacked", a = t || "default", u = r || {}, n = o || {}, l = k[s] || k.stacked || {}, c = D[a] || D.default || {}, m = /* @__PURE__ */ new Set([
    ...Object.keys(l),
    ...Object.keys(c),
    ...Object.keys(u),
    ...Object.keys(n)
  ]), d = {};
  for (const b of m) {
    const i = [
      l[b],
      c[b],
      u[b],
      n[b]
    ].filter(Boolean).join(" ").split(/\s+/).filter(Boolean);
    d[b] = Array.from(new Set(i)).join(" ");
  }
  return d;
}, U = ({ inForm: e, inLayout: t = "stacked" } = {}) => {
  var s, a;
  const r = e, o = t || "stacked";
  if (r && (r.layout = o, r.classes = A({
    inLayout: r.layout,
    inTheme: r.theme,
    inConfigClasses: (a = (s = r.store) == null ? void 0 : s.config) == null ? void 0 : a.classes,
    inCustomClasses: r.customClasses
  }), r.formElement))
    return r.render();
}, Q = ({ inContainerConfig: e = null, inFormSpec: t = null, inClasses: r = {} } = {}) => {
  const o = e, s = t, a = r;
  if (!o)
    return s;
  const n = {
    class: (a == null ? void 0 : a.container) || (o == null ? void 0 : o.class) || "card shadow-sm border-0 mb-4"
  };
  o != null && o.id && (n.id = o.id);
  const l = [], c = o == null ? void 0 : o.header;
  if (c) {
    const b = (a == null ? void 0 : a.containerHeader) || (c == null ? void 0 : c.class) || "card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center", i = [], h = (c == null ? void 0 : c.title) || "Form", f = (c == null ? void 0 : c.icon) || "", y = (c == null ? void 0 : c.titleClass) || "fw-semibold text-secondary", w = [];
    if (f && w.push({
      tagName: "i",
      attributes: { class: `${f} me-1` }
    }), w.push({
      tagName: "span",
      textContent: h
    }), i.push({
      tagName: "div",
      attributes: { class: y },
      children: w
    }), Array.isArray(c == null ? void 0 : c.actions) && c.actions.length > 0) {
      const L = {
        tagName: "div",
        attributes: { class: "d-flex align-items-center gap-2" },
        children: c.actions.map((p) => {
          const g = [];
          p.icon && g.push({
            tagName: "i",
            attributes: { class: `${p.icon} me-1` }
          }), p.label && g.push({
            tagName: "span",
            textContent: p.label
          });
          const x = {
            type: p.type || "button",
            class: p.class || "btn btn-sm btn-outline-secondary"
          };
          return p.id && (x.id = p.id), p.title && (x.title = p.title), {
            tagName: "button",
            attributes: x,
            children: g
          };
        })
      };
      i.push(L);
    }
    l.push({
      tagName: "div",
      attributes: { class: b },
      children: i
    });
  }
  const m = (a == null ? void 0 : a.containerBody) || (o == null ? void 0 : o.bodyClass) || "card-body", d = s ? [s] : [];
  if (Array.isArray(o == null ? void 0 : o.extraControls) && d.push(...o.extraControls), l.push({
    tagName: "div",
    attributes: { class: m },
    children: d
  }), o != null && o.footer) {
    const b = o.footer, i = (a == null ? void 0 : a.containerFooter) || (b == null ? void 0 : b.class) || "card-footer bg-light py-2";
    l.push({
      tagName: "div",
      attributes: { class: i },
      textContent: b.text || ""
    });
  }
  return {
    tagName: "div",
    attributes: n,
    children: l
  };
}, V = ({ inHeadConfig: e = {}, inClasses: t = {} } = {}) => {
  const r = e, o = t, s = (r == null ? void 0 : r.title) || "", a = (r == null ? void 0 : r.subtitle) || "";
  if (!s && !a) return null;
  const u = [];
  return s && u.push({
    tagName: "div",
    textContent: s,
    attributes: {
      class: (o == null ? void 0 : o.headTitle) || "h5 fw-bold mb-1"
    }
  }), a && u.push({
    tagName: "div",
    textContent: a,
    attributes: {
      class: (o == null ? void 0 : o.headSubtitle) || "text-muted small"
    }
  }), {
    tagName: "div",
    attributes: {
      class: (o == null ? void 0 : o.head) || (r == null ? void 0 : r.class) || "pb-2 mb-3 border-bottom"
    },
    children: u
  };
}, X = ({ inColumns: e = [] } = {}) => new Map(e.filter((t) => t == null ? void 0 : t.key).map((t) => [t.key, t])), Y = ({ inSection: e = {}, inColumnsMap: t = /* @__PURE__ */ new Map() } = {}) => (Array.isArray(e.columns) ? e.columns : []).map((r) => typeof r == "string" ? t.get(r) : r).filter(Boolean), Z = ({ inColumn: e = {} } = {}) => e.type === "number" ? "number" : "text", P = ({ inColumn: e = {} } = {}) => {
  const t = e.key || "";
  return {
    key: t,
    labelText: e.label || t,
    inputType: Z({ inColumn: e }),
    inputId: e.id || ""
  };
}, F = ({ inConfig: e = {} } = {}) => {
  var t;
  return ((t = e == null ? void 0 : e.control) == null ? void 0 : t.alignment) || (e == null ? void 0 : e.alignment) || ((e == null ? void 0 : e.layout) === "horizontal" ? "horizontal" : "stacked");
}, C = ({ inAlignment: e = "stacked", inClasses: t = {} } = {}) => e === "horizontal" ? (t == null ? void 0 : t.label) || "col-sm-4 col-form-label text-sm-end mb-0" : (t == null ? void 0 : t.label) || "form-label mb-1", tt = ({ inConfig: e = {} } = {}) => {
  if (!(e != null && e.grid))
    return "";
  const t = typeof e.grid == "object" ? e.grid.columns || e.grid.cols : e.grid;
  return t === 1 ? "col-12" : t === 2 ? "col-md-6" : t === 3 ? "col-md-4" : t === 4 ? "col-md-3" : "";
}, et = ({ inColumn: e = {}, inClasses: t = {}, inConfig: r = {} } = {}) => {
  const o = F({ inConfig: r }), s = tt({ inConfig: r });
  return {
    alignment: o,
    labelClass: C({ inAlignment: o, inClasses: t }),
    fieldClass: e.colClass || e.class || s || (t == null ? void 0 : t.field) || ""
  };
}, rt = ({ inColumn: e = {}, inInputType: t = "text" } = {}) => e.datalist === !0 || e.datalist !== !1 && t !== "number", ot = ({ inColumn: e = {}, inConfig: t = {} } = {}) => {
  var s, a;
  const r = ((s = t == null ? void 0 : t.control) == null ? void 0 : s.searchButtons) === !1 || (t == null ? void 0 : t.searchButtons) === !1 || e.searchButton === !1 || e.search === !1, o = ((a = t == null ? void 0 : t.control) == null ? void 0 : a.searchButtons) === !0 || (t == null ? void 0 : t.searchButtons) === !0 || e.searchButton === !0 || e.search === !0;
  return !r && (o || !!e.searchId);
}, st = ({
  inColumn: e = {},
  inClasses: t = {},
  inConfig: r = {},
  inFieldIdentity: o = {}
} = {}) => ({
  hasDatalist: rt({
    inColumn: e,
    inInputType: o.inputType
  }),
  datalistId: e.datalistId || `${o.key}-datalist`,
  hasSearchAction: ot({ inColumn: e, inConfig: r }),
  searchButtonId: e.searchId || `${o.key}-search`,
  inputClass: (t == null ? void 0 : t.input) || "",
  buttonClass: (t == null ? void 0 : t.button) || "btn btn-outline-secondary",
  groupClass: (t == null ? void 0 : t.group) || "",
  controlWrapperClass: (t == null ? void 0 : t.controlWrapper) || ""
}), at = ({ inColumn: e = {}, inClasses: t = {}, inConfig: r = {} } = {}) => {
  const o = P({ inColumn: e }), s = et({ inColumn: e, inClasses: t, inConfig: r }), a = st({
    inColumn: e,
    inClasses: t,
    inConfig: r,
    inFieldIdentity: o
  });
  return {
    ...o,
    ...s,
    ...a
  };
}, nt = ({ inFieldPlan: e = {} } = {}) => {
  const t = {};
  return e.labelClass && (t.class = e.labelClass), e.inputId && (t.for = e.inputId), {
    tagName: "label",
    textContent: e.labelText,
    attributes: t
  };
}, I = ({ inFieldPlan: e = {} } = {}) => {
  const t = {
    type: e.inputType,
    name: e.key,
    placeholder: `Enter ${e.labelText}...`
  };
  return e.inputClass && (t.class = e.inputClass), e.hasDatalist && (t.list = e.datalistId), e.inputId && (t.id = e.inputId), {
    tagName: "input",
    attributes: t
  };
}, lt = ({ inFieldPlan: e = {} } = {}) => ({
  tagName: "button",
  textContent: "Search",
  attributes: {
    type: "button",
    id: e.searchButtonId,
    name: `${e.key}-search`,
    "data-key": e.key,
    class: e.buttonClass
  }
}), ct = ({ inFieldPlan: e = {} } = {}) => ({
  tagName: "div",
  attributes: e.groupClass ? { class: e.groupClass } : {},
  children: [
    I({ inFieldPlan: e }),
    lt({ inFieldPlan: e })
  ]
}), ut = ({ inFieldPlan: e = {} } = {}) => e.hasSearchAction ? ct({ inFieldPlan: e }) : I({ inFieldPlan: e }), dt = ({ inFieldPlan: e = {}, inControlNode: t = null } = {}) => e.controlWrapperClass ? {
  tagName: "div",
  attributes: { class: e.controlWrapperClass },
  children: [t]
} : t, it = ({ inFieldPlan: e = {} } = {}) => {
  const t = ut({ inFieldPlan: e });
  return dt({
    inFieldPlan: e,
    inControlNode: t
  });
}, mt = ({ inFieldPlan: e = {}, inLabelNode: t = null, inControlNode: r = null } = {}) => {
  const o = e.fieldClass ? { class: e.fieldClass } : {};
  if (e.alignment === "horizontal") {
    const s = e.controlWrapperClass ? r : {
      tagName: "div",
      attributes: { class: "col-sm-8" },
      children: [r]
    };
    return {
      tagName: "div",
      attributes: o,
      children: [{
        tagName: "div",
        attributes: { class: "row align-items-center g-2" },
        children: [t, s]
      }]
    };
  }
  return {
    tagName: "div",
    attributes: o,
    children: [t, r]
  };
}, T = ({ inColumn: e = {}, inClasses: t = {}, inConfig: r = {} } = {}) => {
  const o = at({ inColumn: e, inClasses: t, inConfig: r }), s = nt({ inFieldPlan: o }), a = it({ inFieldPlan: o });
  return mt({
    inFieldPlan: o,
    inLabelNode: s,
    inControlNode: a
  });
}, bt = ({ inColumns: e = [], inClasses: t = {}, inConfig: r = {} } = {}) => e.map((o) => T({ inColumn: o, inClasses: t, inConfig: r })), pt = ({ inChildren: e = [], inClass: t = "" } = {}) => ({
  tagName: "div",
  attributes: t ? { class: t } : {},
  children: e
}), ht = ({ inSection: e = {}, inClasses: t = {} } = {}) => {
  if (!e.title)
    return null;
  const r = [
    ...e.icon ? [{ tagName: "i", attributes: { class: e.icon } }] : [],
    {
      tagName: "span",
      textContent: e.title
    }
  ];
  return {
    tagName: "div",
    attributes: {
      class: e.headerClass || (t == null ? void 0 : t.sectionHeader) || "card-header bg-light py-2 fw-semibold d-flex align-items-center gap-2"
    },
    children: r
  };
}, ft = ({ inChildren: e = [], inSection: t = {}, inClasses: r = {} } = {}) => ({
  tagName: "div",
  attributes: {
    class: t.cardClass || (r == null ? void 0 : r.sectionCard) || "card h-100 shadow-sm border-0"
  },
  children: e
}), yt = ({ inSection: e = {}, inChildren: t = [] } = {}) => ({
  tagName: "div",
  attributes: {
    class: e.class || "col-md-6"
  },
  children: t
}), wt = ({ inChildren: e = [], inClass: t = "row g-4" } = {}) => ({
  tagName: "div",
  attributes: t ? { class: t } : {},
  children: e
}), R = ({ inConfig: e = {} } = {}) => Array.isArray(e == null ? void 0 : e.sections) && e.sections.length > 0, gt = ({
  inColumns: e = [],
  inConfig: t = {},
  inClasses: r = {}
} = {}) => {
  if (!R({ inConfig: t }))
    return null;
  const o = X({ inColumns: e }), s = t.sections.map((a) => {
    const u = Y({
      inSection: a,
      inColumnsMap: o
    }), n = bt({
      inColumns: u,
      inClasses: r,
      inConfig: t
    }), l = pt({
      inChildren: n,
      inClass: a.bodyClass || (r == null ? void 0 : r.sectionBody) || "d-flex flex-column gap-3"
    }), c = ht({
      inSection: a,
      inClasses: r
    }), m = ft({
      inChildren: [c, l].filter(Boolean),
      inSection: a,
      inClasses: r
    });
    return yt({
      inSection: a,
      inChildren: [m]
    });
  });
  return wt({
    inChildren: s,
    inClass: t.sectionsRowClass || "row g-4"
  });
}, xt = ({ inColumns: e = [], inClasses: t = {}, inConfig: r = {} } = {}) => e.map((o) => T({ inColumn: o, inClasses: t, inConfig: r })), vt = ({ inConfig: e = {}, inClasses: t = {} } = {}) => {
  var r;
  return e != null && e.grid ? `row g-${((r = e.grid) == null ? void 0 : r.gap) ?? 3}` : (t == null ? void 0 : t.body) || "";
}, Nt = ({ inColumns: e = [], inConfig: t = {}, inClasses: r = {} } = {}) => {
  if (!Array.isArray(e))
    return { tagName: "div", children: [] };
  if (R({ inConfig: t }))
    return gt({ inColumns: e, inConfig: t, inClasses: r });
  const o = xt({ inColumns: e, inConfig: t, inClasses: r }), s = vt({ inConfig: t, inClasses: r });
  return {
    tagName: "div",
    attributes: s ? { class: s } : {},
    children: o
  };
}, At = (e) => Array.isArray(e == null ? void 0 : e.buttons) && e.buttons.length > 0, St = ({ inFootConfig: e = {} } = {}) => Array.isArray(e == null ? void 0 : e.rows) ? e.rows.filter(At) : Array.isArray(e == null ? void 0 : e.buttons) && e.buttons.length > 0 ? [{ buttons: e.buttons }] : [], v = (...e) => Array.from(new Set(
  e.filter(Boolean).join(" ").split(/\s+/).filter(Boolean)
)).join(" "), kt = ({ inFootConfig: e = {}, inClasses: t = {} } = {}) => {
  const r = (t == null ? void 0 : t.foot) || "pt-3 mt-3 border-top", o = (t == null ? void 0 : t.footRows) || "d-flex flex-column gap-2", s = (t == null ? void 0 : t.footRow) || "d-flex align-items-center justify-content-end gap-2 flex-wrap";
  return {
    attributes: {
      class: v(r, e == null ? void 0 : e.class)
    },
    rowsClass: v(o, e == null ? void 0 : e.rowsClass),
    rowClass: s,
    buttonClass: (t == null ? void 0 : t.button) || "btn btn-outline-secondary",
    rows: St({ inFootConfig: e })
  };
}, Dt = ({ inButtonConfig: e = {}, inFootPlan: t = {} } = {}) => {
  const o = e.variant === "primary" ? "btn btn-primary" : t.buttonClass, s = e.class || o, a = {
    type: e.type || "button",
    name: e.name || "",
    class: s
  };
  return e.id && (a.id = e.id), {
    tagName: "button",
    textContent: e.label || e.name,
    attributes: a
  };
}, It = ({ inRowConfig: e = {}, inFootPlan: t = {} } = {}) => {
  const r = v(t.rowClass, e.class);
  return {
    tagName: "div",
    attributes: r ? { class: r } : {},
    children: e.buttons.map((o) => Dt({
      inButtonConfig: o,
      inFootPlan: t
    }))
  };
}, Tt = ({ inFootPlan: e = {} } = {}) => ({
  tagName: "div",
  attributes: e.rowsClass ? { class: e.rowsClass } : {},
  children: e.rows.map((t) => It({
    inRowConfig: t,
    inFootPlan: e
  }))
}), Rt = ({ inFootConfig: e = {}, inClasses: t = {} } = {}) => {
  const r = kt({ inFootConfig: e, inClasses: t });
  return r.rows.length === 0 ? null : {
    tagName: "div",
    attributes: r.attributes,
    children: [Tt({ inFootPlan: r })]
  };
}, j = ({ inColumns: e = [], inConfig: t = {}, inClasses: r = {} } = {}) => {
  const o = e, s = t, a = r, u = V({ inHeadConfig: s == null ? void 0 : s.head, inClasses: a }), n = Nt({ inColumns: o, inConfig: s, inClasses: a }), l = Rt({ inFootConfig: s == null ? void 0 : s.foot, inClasses: a }), m = {
    tagName: "div",
    attributes: a != null && a.form ? { class: a.form } : {},
    children: [u, n, l].filter(Boolean)
  };
  return Q({
    inContainerConfig: s == null ? void 0 : s.container,
    inFormSpec: m,
    inClasses: a
  });
}, jt = ({ inForm: e } = {}) => {
  const t = e;
  return t != null && t.store ? j({
    inColumns: t.store.activeColumns,
    inConfig: t.store.config,
    inClasses: t.classes
  }) : null;
}, N = ({ inSpec: e } = {}) => {
  var l, c, m;
  const t = e;
  if (!t || typeof t != "object") return null;
  if (Array.isArray(t)) {
    const d = t.map((b) => N({ inSpec: b })).filter(Boolean);
    return d.length > 0 ? d : null;
  }
  const o = (Array.isArray(t.children) ? t.children : []).map((d) => N({ inSpec: d })).filter(Boolean), s = ((l = t.attributes) == null ? void 0 : l.id) || t.id, a = !!s, u = o.length > 0;
  if (!a && !u)
    return null;
  const n = {
    tagName: t.tagName
  };
  return s && (n.id = s), (c = t.attributes) != null && c.name && (n.name = t.attributes.name), (m = t.attributes) != null && m.type && (n.type = t.attributes.type), t.attributes && (n.attributes = t.attributes), o.length > 0 && (n.children = o), n;
}, Et = ({ inForm: e, inContainerId: t, inContainer: r } = {}) => {
  var b, i;
  const o = e, s = t, a = r;
  if (!o)
    return console.error("[json-to-dom-renderers:Form] Form instance (inForm) is required to render."), {
      treeWithIds: null,
      spec: null,
      element: null,
      error: "Form instance (inForm) is required"
    };
  const u = j({
    inColumns: o.store.activeColumns,
    inConfig: o.store.config,
    inClasses: o.classes
  }), n = N({ inSpec: u }), l = (i = (b = window.ks) == null ? void 0 : b["json-to-dom"]) == null ? void 0 : i.buildSpecElement;
  if (typeof l != "function")
    return console.error("json-to-dom buildSpecElement not found on window.ks"), {
      treeWithIds: n,
      spec: u,
      element: null
    };
  const c = l({ inSpec: u }), m = Array.isArray(c) ? c[0] : c;
  let d = null;
  if (a instanceof HTMLElement)
    d = a;
  else {
    const h = s || o.containerId;
    h && (d = document.getElementById(h));
  }
  return d && (d.innerHTML = "", d.appendChild(m)), o.formElement = m, o.controlsTree = n, {
    treeWithIds: n,
    spec: u,
    element: m,
    store: o.store
  };
}, E = ({ inForm: e, inContainerId: t, inContainer: r, targetContainerId: o } = {}) => {
  const s = e, n = Et({
    inForm: s,
    inContainerId: t || o,
    inContainer: r
  });
  return n != null && n.element && (s.formElement = n.element, s.controlsTree = n.treeWithIds), n;
}, Lt = async ({ inForm: e, inContainerId: t, inContainer: r, targetContainerId: o } = {}) => {
  const s = e, a = t || o, u = r;
  return s != null && s.dataProvider && (!s.store.formData || Object.keys(s.store.formData).length === 0) && await s.actions.load(), E({
    inForm: s,
    inContainerId: a,
    inContainer: u
  });
}, Bt = ({ inForm: e } = {}) => {
  const t = e;
  return {
    buildSpec: () => jt({ inForm: t }),
    renderStructure: ({ inContainerId: a, inContainer: u, targetContainerId: n } = {}) => {
      const l = E({
        inForm: t,
        inContainerId: a,
        inContainer: u,
        targetContainerId: n
      });
      return l != null && l.element && (t.formElement = l.element, t.controlsTree = l.treeWithIds), l;
    },
    render: async ({ inContainerId: a, inContainer: u, targetContainerId: n } = {}) => {
      const l = await Lt({
        inForm: t,
        inContainerId: a,
        inContainer: u,
        targetContainerId: n
      });
      return l != null && l.element && (t.formElement = l.element, t.controlsTree = l.treeWithIds), l;
    }
  };
}, Wt = ({ inForm: e } = {}) => {
  const t = e, r = async ({ inQuery: n = {} } = {}) => {
    var l, c;
    if (!(t != null && t.dataProvider) || typeof t.dataProvider.read != "function")
      return ((l = t == null ? void 0 : t.store) == null ? void 0 : l.formData) || {};
    try {
      const m = await t.dataProvider.read({ inQuery: n }), d = Array.isArray(m) ? m[0] : (m == null ? void 0 : m.data) || m || {};
      return t.store.updateData({ inData: d }), t.renderStructure(), d;
    } catch (m) {
      return console.error("[json-to-dom-form:load] Failed to load data via dataProvider:", m), ((c = t == null ? void 0 : t.store) == null ? void 0 : c.formData) || {};
    }
  }, o = ({ inData: n = {} } = {}) => (t.store.updateData({ inData: n }), t.renderStructure());
  return {
    load: r,
    update: o,
    getData: () => {
      if (!(t != null && t.formElement)) return {};
      const n = {}, l = (c) => {
        if (!(c instanceof Element)) return;
        const m = c.matches ? c.matches("input, select, textarea") ? [c] : [] : [], d = Array.from(c.querySelectorAll("input, select, textarea"));
        [...m, ...d].forEach((i) => {
          var h;
          if (i.name) {
            if (i instanceof HTMLInputElement && (i.type === "checkbox" || i.type === "radio")) {
              i.checked && (n[i.name] = i.value ?? !0);
              return;
            }
            if (i instanceof HTMLSelectElement && i.multiple) {
              n[i.name] = Array.from(i.selectedOptions).map((f) => f.value);
              return;
            }
            if (i instanceof HTMLInputElement && i.type === "file") {
              n[i.name] = (h = i.files) != null && h.length ? Array.from(i.files).map((f) => f.name) : "";
              return;
            }
            n[i.name] = i.value;
          }
        });
      };
      return t.formElement instanceof HTMLFormElement, l(t.formElement), n;
    },
    setData: ({ inData: n = {} } = {}) => o({ inData: n }),
    reset: () => {
      t != null && t.formElement && typeof t.formElement.reset == "function" && t.formElement.reset();
    }
  };
};
class Mt {
  constructor({
    data: t = {},
    columns: r = [],
    config: o = {},
    layout: s,
    theme: a,
    classes: u = {},
    dataProvider: n = null,
    targetContainerId: l = ""
  } = {}) {
    const c = t, m = r, d = o, b = s || (d == null ? void 0 : d.layout) || "stacked", i = a || (d == null ? void 0 : d.theme) || "default", h = u, f = n, y = l;
    this.containerId = y, this.layout = b, this.theme = i, this.customClasses = h, this.classes = A({
      inLayout: this.layout,
      inTheme: this.theme,
      inConfigClasses: d == null ? void 0 : d.classes,
      inCustomClasses: this.customClasses
    }), this.dataProvider = f, this.formElement = null, this.controlsTree = null, this.store = new M({
      inData: c,
      inColumns: m,
      inConfig: d
    }), this.methods = Bt({ inForm: this }), this.actions = Wt({ inForm: this }), this.spec = this.buildSpec();
  }
  setLayout({ inLayout: t, layout: r = "stacked" } = {}) {
    return U({ inForm: this, inLayout: t || r || "stacked" });
  }
  setTheme({ inTheme: t, theme: r = "default" } = {}) {
    return J({ inForm: this, inTheme: t || r || "default" });
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
const Ot = "v9.0.0";
window.ks ?? (window.ks = {});
window.ks["json-to-dom-form"] = {
  version: Ot,
  Form: Mt
};
export {
  Mt as Form,
  Mt as default,
  Ot as version
};
