import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Calculator,
  TrendingUp,
  Flame,
  Scale,
  DollarSign,
  PieChart,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  BookOpen,
} from "lucide-react";

import { SiteShell, Breadcrumbs } from "@/components/site-shell";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { USEFUL_CALCULATORS, type CalculatorDef } from "@/lib/useful-tools-data";

export const Route = createFileRoute("/useful-tools/")({
  head: () => ({
    meta: [
      { title: "Useful Startup Tools & Calculators | BBI" },
      {
        name: "description",
        content:
          "Free interactive financial, market sizing, runway, CAC, and LTV calculators with real formulas and benchmark guidance.",
      },
      { property: "og:title", content: "Useful Startup Tools & Calculators | BBI" },
      {
        property: "og:description",
        content:
          "Calculate TAM/SAM/SOM, Cash Runway, Break-Even volume, CAC Payback, and LTV:CAC ratios instantly in your browser.",
      },
    ],
  }),
  component: UsefulToolsPage,
});

function formatCurrency(val: number): string {
  if (!Number.isFinite(val)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(val);
}

function formatNumber(val: number, decimals = 1): string {
  if (!Number.isFinite(val)) return "—";
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: decimals,
  }).format(val);
}

function UsefulToolsPage() {
  const [activeSlug, setActiveSlug] = useState<string>("tam-sam-som");

  // State for TAM/SAM/SOM
  const [tamInputs, setTamInputs] = useState({
    customers: 500000,
    acv: 1200,
    serviceablePct: 15,
    obtainableShare: 2,
  });

  // State for Runway
  const [runwayInputs, setRunwayInputs] = useState({
    cash: 150000,
    grossBurn: 22000,
    revenue: 7000,
    growthRate: 5,
  });

  // State for Break-Even
  const [breakEvenInputs, setBreakEvenInputs] = useState({
    fixedCosts: 8000,
    pricePerUnit: 150,
    variableCost: 35,
  });

  // State for CAC
  const [cacInputs, setCacInputs] = useState({
    spend: 18000,
    newCustomers: 30,
    monthlyArpu: 250,
    grossMargin: 80,
  });

  // State for LTV
  const [ltvInputs, setLtvInputs] = useState({
    monthlyArpu: 120,
    grossMargin: 82,
    monthlyChurn: 3.5,
    cac: 650,
  });

  const activeCalc = USEFUL_CALCULATORS.find((c) => c.slug === activeSlug) ?? USEFUL_CALCULATORS[0];

  // Mathematical computations
  // 1. TAM / SAM / SOM
  const calcTam = tamInputs.customers * tamInputs.acv;
  const calcSam = tamInputs.customers * (tamInputs.serviceablePct / 100) * tamInputs.acv;
  const calcSom = calcSam * (tamInputs.obtainableShare / 100);
  const requiredAccounts = tamInputs.acv > 0 ? Math.round(calcSom / tamInputs.acv) : 0;

  // 2. Runway
  const netMonthlyBurn = runwayInputs.grossBurn - runwayInputs.revenue;
  const runwayMonths = netMonthlyBurn > 0 ? runwayInputs.cash / netMonthlyBurn : Infinity;
  const safeFundraiseStart = Number.isFinite(runwayMonths) ? Math.max(0, runwayMonths - 6) : 0;
  const isDefaultAlive = runwayInputs.revenue >= runwayInputs.grossBurn;

  // 3. Break-Even
  const contribMarginUnit = breakEvenInputs.pricePerUnit - breakEvenInputs.variableCost;
  const contribMarginRatio =
    breakEvenInputs.pricePerUnit > 0 ? (contribMarginUnit / breakEvenInputs.pricePerUnit) * 100 : 0;
  const breakEvenUnits =
    contribMarginUnit > 0 ? Math.ceil(breakEvenInputs.fixedCosts / contribMarginUnit) : Infinity;
  const breakEvenRevenue = Number.isFinite(breakEvenUnits)
    ? breakEvenUnits * breakEvenInputs.pricePerUnit
    : Infinity;

  // 4. CAC & Payback
  const calculatedCac = cacInputs.newCustomers > 0 ? cacInputs.spend / cacInputs.newCustomers : 0;
  const monthlyGrossProfitCustomer = cacInputs.monthlyArpu * (cacInputs.grossMargin / 100);
  const cacPaybackMonths =
    monthlyGrossProfitCustomer > 0 ? calculatedCac / monthlyGrossProfitCustomer : Infinity;

  // 5. LTV & Health
  const customerLifespanMonths =
    ltvInputs.monthlyChurn > 0 ? 1 / (ltvInputs.monthlyChurn / 100) : 100;
  const calculatedLtv =
    (ltvInputs.monthlyArpu * (ltvInputs.grossMargin / 100)) / (ltvInputs.monthlyChurn / 100);
  const ltvCacRatio = ltvInputs.cac > 0 ? calculatedLtv / ltvInputs.cac : 0;

  const getCalcIcon = (slug: string) => {
    switch (slug) {
      case "tam-sam-som":
        return <PieChart className="h-4 w-4" />;
      case "runway":
        return <Flame className="h-4 w-4" />;
      case "break-even":
        return <Scale className="h-4 w-4" />;
      case "cac":
        return <TrendingUp className="h-4 w-4" />;
      case "ltv":
        return <DollarSign className="h-4 w-4" />;
      default:
        return <Calculator className="h-4 w-4" />;
    }
  };

  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({
            path: "/useful-tools",
            name: "Useful Startup Tools & Calculators | BBI",
            description:
              "Free interactive financial, runway, CAC, and market sizing calculators for founders.",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Useful Tools", path: "/useful-tools" },
          ]),
        ]}
      />
      <SiteShell>
        <div className="mx-auto max-w-6xl px-3 py-10 sm:px-4 sm:py-14">
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Useful Tools" }]} />

          <div className="mt-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="t-eyebrow">Interactive Utilities</p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Founder Calculators &{" "}
                <span className="bg-gradient-to-r from-primary via-accent to-warm bg-clip-text text-transparent">
                  Unit Economics Engine
                </span>
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                Run zero-bs market sizing, cash runway stress tests, break-even unit requirements,
                and CAC payback models. Calculations execute client-side in real-time.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                to="/startup-guides"
                className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                <BookOpen className="h-3.5 w-3.5" />
                Read Guides
              </Link>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="mt-8 flex flex-wrap gap-2 border-b border-border pb-4">
            {USEFUL_CALCULATORS.map((calc) => {
              const isActive = calc.slug === activeSlug;
              return (
                <button
                  key={calc.slug}
                  type="button"
                  onClick={() => setActiveSlug(calc.slug)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "glass text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {getCalcIcon(calc.slug)}
                  <span>{calc.name.split("Calculator")[0].trim()}</span>
                </button>
              );
            })}
          </div>

          {/* Active Calculator Box */}
          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            {/* Left Column: Inputs */}
            <div className="glass rounded-2xl p-6 sm:p-8 lg:col-span-7">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
                    {activeCalc.category.toUpperCase()}
                  </span>
                  <h2 className="mt-1 font-display text-2xl font-bold tracking-tight">
                    {activeCalc.name}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (activeSlug === "tam-sam-som") {
                      setTamInputs({
                        customers: 500000,
                        acv: 1200,
                        serviceablePct: 15,
                        obtainableShare: 2,
                      });
                    } else if (activeSlug === "runway") {
                      setRunwayInputs({
                        cash: 150000,
                        grossBurn: 22000,
                        revenue: 7000,
                        growthRate: 5,
                      });
                    } else if (activeSlug === "break-even") {
                      setBreakEvenInputs({ fixedCosts: 8000, pricePerUnit: 150, variableCost: 35 });
                    } else if (activeSlug === "cac") {
                      setCacInputs({
                        spend: 18000,
                        newCustomers: 30,
                        monthlyArpu: 250,
                        grossMargin: 80,
                      });
                    } else if (activeSlug === "ltv") {
                      setLtvInputs({
                        monthlyArpu: 120,
                        grossMargin: 82,
                        monthlyChurn: 3.5,
                        cac: 650,
                      });
                    }
                  }}
                  className="flex items-center gap-1.5 rounded-lg border border-border/80 px-2.5 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                  title="Reset to default benchmark values"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </button>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {activeCalc.description}
              </p>

              {/* Dynamic Input Fields */}
              <div className="mt-8 space-y-6">
                {activeSlug === "tam-sam-som" && (
                  <>
                    <div>
                      <div className="flex justify-between text-xs font-semibold">
                        <label htmlFor="tam-cust">Total Potential Buyer Accounts in Market</label>
                        <span className="tabular-nums text-foreground">
                          {formatNumber(tamInputs.customers, 0)}
                        </span>
                      </div>
                      <input
                        id="tam-cust"
                        type="range"
                        min="1000"
                        max="5000000"
                        step="5000"
                        value={tamInputs.customers}
                        onChange={(e) =>
                          setTamInputs({ ...tamInputs, customers: Number(e.target.value) })
                        }
                        className="mt-2 w-full accent-primary"
                      />
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        Universe of businesses or users experiencing the problem.
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold">
                        <label htmlFor="tam-acv">Average Annual Contract Value (ACV / ARPU)</label>
                        <span className="tabular-nums text-foreground">
                          {formatCurrency(tamInputs.acv)}
                        </span>
                      </div>
                      <input
                        id="tam-acv"
                        type="range"
                        min="50"
                        max="50000"
                        step="50"
                        value={tamInputs.acv}
                        onChange={(e) =>
                          setTamInputs({ ...tamInputs, acv: Number(e.target.value) })
                        }
                        className="mt-2 w-full accent-primary"
                      />
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        Expected annual revenue generated per paying customer.
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold">
                        <label htmlFor="tam-sam-pct">
                          Serviceable Market Filter % (Geography, Tech Fit)
                        </label>
                        <span className="tabular-nums text-foreground">
                          {tamInputs.serviceablePct}%
                        </span>
                      </div>
                      <input
                        id="tam-sam-pct"
                        type="range"
                        min="1"
                        max="100"
                        step="0.5"
                        value={tamInputs.serviceablePct}
                        onChange={(e) =>
                          setTamInputs({ ...tamInputs, serviceablePct: Number(e.target.value) })
                        }
                        className="mt-2 w-full accent-primary"
                      />
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        Portion matching your ICP, language, geography, and sales channel.
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold">
                        <label htmlFor="tam-som-share">Target Obtainable Share % (Years 1–3)</label>
                        <span className="tabular-nums text-foreground">
                          {tamInputs.obtainableShare}%
                        </span>
                      </div>
                      <input
                        id="tam-som-share"
                        type="range"
                        min="0.1"
                        max="20"
                        step="0.1"
                        value={tamInputs.obtainableShare}
                        onChange={(e) =>
                          setTamInputs({ ...tamInputs, obtainableShare: Number(e.target.value) })
                        }
                        className="mt-2 w-full accent-primary"
                      />
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        Realistic share achievable with near-term team and distribution.
                      </p>
                    </div>
                  </>
                )}

                {activeSlug === "runway" && (
                  <>
                    <div>
                      <div className="flex justify-between text-xs font-semibold">
                        <label htmlFor="runway-cash">Current Cash Reserves</label>
                        <span className="tabular-nums text-foreground">
                          {formatCurrency(runwayInputs.cash)}
                        </span>
                      </div>
                      <input
                        id="runway-cash"
                        type="range"
                        min="5000"
                        max="2000000"
                        step="5000"
                        value={runwayInputs.cash}
                        onChange={(e) =>
                          setRunwayInputs({ ...runwayInputs, cash: Number(e.target.value) })
                        }
                        className="mt-2 w-full accent-primary"
                      />
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        Total liquid capital available in bank accounts.
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold">
                        <label htmlFor="runway-burn">Gross Monthly Operating Expenses</label>
                        <span className="tabular-nums text-foreground">
                          {formatCurrency(runwayInputs.grossBurn)}
                        </span>
                      </div>
                      <input
                        id="runway-burn"
                        type="range"
                        min="1000"
                        max="150000"
                        step="1000"
                        value={runwayInputs.grossBurn}
                        onChange={(e) =>
                          setRunwayInputs({ ...runwayInputs, grossBurn: Number(e.target.value) })
                        }
                        className="mt-2 w-full accent-primary"
                      />
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        Total monthly payroll, server hosting, tools, and office rent.
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold">
                        <label htmlFor="runway-rev">Monthly Collected Revenue</label>
                        <span className="tabular-nums text-foreground">
                          {formatCurrency(runwayInputs.revenue)}
                        </span>
                      </div>
                      <input
                        id="runway-rev"
                        type="range"
                        min="0"
                        max="150000"
                        step="500"
                        value={runwayInputs.revenue}
                        onChange={(e) =>
                          setRunwayInputs({ ...runwayInputs, revenue: Number(e.target.value) })
                        }
                        className="mt-2 w-full accent-primary"
                      />
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        Current recurring revenue collected per 30-day period.
                      </p>
                    </div>
                  </>
                )}

                {activeSlug === "break-even" && (
                  <>
                    <div>
                      <div className="flex justify-between text-xs font-semibold">
                        <label htmlFor="be-fixed">Fixed Monthly Overhead Costs</label>
                        <span className="tabular-nums text-foreground">
                          {formatCurrency(breakEvenInputs.fixedCosts)}
                        </span>
                      </div>
                      <input
                        id="be-fixed"
                        type="range"
                        min="500"
                        max="100000"
                        step="250"
                        value={breakEvenInputs.fixedCosts}
                        onChange={(e) =>
                          setBreakEvenInputs({
                            ...breakEvenInputs,
                            fixedCosts: Number(e.target.value),
                          })
                        }
                        className="mt-2 w-full accent-primary"
                      />
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        Salaries, software subscriptions, rent, and legal costs.
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold">
                        <label htmlFor="be-price">Selling Price per Unit / Subscription</label>
                        <span className="tabular-nums text-foreground">
                          {formatCurrency(breakEvenInputs.pricePerUnit)}
                        </span>
                      </div>
                      <input
                        id="be-price"
                        type="range"
                        min="5"
                        max="5000"
                        step="5"
                        value={breakEvenInputs.pricePerUnit}
                        onChange={(e) =>
                          setBreakEvenInputs({
                            ...breakEvenInputs,
                            pricePerUnit: Number(e.target.value),
                          })
                        }
                        className="mt-2 w-full accent-primary"
                      />
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        Price charged to the end customer per deliverable or seat.
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold">
                        <label htmlFor="be-var">Variable Cost per Unit (COGS / Fulfillment)</label>
                        <span className="tabular-nums text-foreground">
                          {formatCurrency(breakEvenInputs.variableCost)}
                        </span>
                      </div>
                      <input
                        id="be-var"
                        type="range"
                        min="0"
                        max="4000"
                        step="5"
                        value={breakEvenInputs.variableCost}
                        onChange={(e) =>
                          setBreakEvenInputs({
                            ...breakEvenInputs,
                            variableCost: Number(e.target.value),
                          })
                        }
                        className="mt-2 w-full accent-primary"
                      />
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        Direct hosting, packaging, payment processing, or contractor pay per unit.
                      </p>
                    </div>
                  </>
                )}

                {activeSlug === "cac" && (
                  <>
                    <div>
                      <div className="flex justify-between text-xs font-semibold">
                        <label htmlFor="cac-spend">Total Sales & Marketing Spend in Period</label>
                        <span className="tabular-nums text-foreground">
                          {formatCurrency(cacInputs.spend)}
                        </span>
                      </div>
                      <input
                        id="cac-spend"
                        type="range"
                        min="500"
                        max="200000"
                        step="500"
                        value={cacInputs.spend}
                        onChange={(e) =>
                          setCacInputs({ ...cacInputs, spend: Number(e.target.value) })
                        }
                        className="mt-2 w-full accent-primary"
                      />
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        Ad spend, sales salaries, SDR tools, and creative production.
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold">
                        <label htmlFor="cac-cust">New Customers Acquired in Period</label>
                        <span className="tabular-nums text-foreground">
                          {cacInputs.newCustomers} accounts
                        </span>
                      </div>
                      <input
                        id="cac-cust"
                        type="range"
                        min="1"
                        max="500"
                        step="1"
                        value={cacInputs.newCustomers}
                        onChange={(e) =>
                          setCacInputs({ ...cacInputs, newCustomers: Number(e.target.value) })
                        }
                        className="mt-2 w-full accent-primary"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold">
                        <label htmlFor="cac-arpu">
                          Average Monthly Revenue per Customer (ARPU)
                        </label>
                        <span className="tabular-nums text-foreground">
                          {formatCurrency(cacInputs.monthlyArpu)}/mo
                        </span>
                      </div>
                      <input
                        id="cac-arpu"
                        type="range"
                        min="10"
                        max="5000"
                        step="10"
                        value={cacInputs.monthlyArpu}
                        onChange={(e) =>
                          setCacInputs({ ...cacInputs, monthlyArpu: Number(e.target.value) })
                        }
                        className="mt-2 w-full accent-primary"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold">
                        <label htmlFor="cac-margin">Gross Margin %</label>
                        <span className="tabular-nums text-foreground">
                          {cacInputs.grossMargin}%
                        </span>
                      </div>
                      <input
                        id="cac-margin"
                        type="range"
                        min="10"
                        max="98"
                        step="1"
                        value={cacInputs.grossMargin}
                        onChange={(e) =>
                          setCacInputs({ ...cacInputs, grossMargin: Number(e.target.value) })
                        }
                        className="mt-2 w-full accent-primary"
                      />
                    </div>
                  </>
                )}

                {activeSlug === "ltv" && (
                  <>
                    <div>
                      <div className="flex justify-between text-xs font-semibold">
                        <label htmlFor="ltv-arpu">Monthly ARPU (Average Revenue per User)</label>
                        <span className="tabular-nums text-foreground">
                          {formatCurrency(ltvInputs.monthlyArpu)}/mo
                        </span>
                      </div>
                      <input
                        id="ltv-arpu"
                        type="range"
                        min="5"
                        max="3000"
                        step="5"
                        value={ltvInputs.monthlyArpu}
                        onChange={(e) =>
                          setLtvInputs({ ...ltvInputs, monthlyArpu: Number(e.target.value) })
                        }
                        className="mt-2 w-full accent-primary"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold">
                        <label htmlFor="ltv-margin">Gross Margin %</label>
                        <span className="tabular-nums text-foreground">
                          {ltvInputs.grossMargin}%
                        </span>
                      </div>
                      <input
                        id="ltv-margin"
                        type="range"
                        min="20"
                        max="95"
                        step="1"
                        value={ltvInputs.grossMargin}
                        onChange={(e) =>
                          setLtvInputs({ ...ltvInputs, grossMargin: Number(e.target.value) })
                        }
                        className="mt-2 w-full accent-primary"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold">
                        <label htmlFor="ltv-churn">Monthly Customer Churn Rate %</label>
                        <span className="tabular-nums text-foreground">
                          {ltvInputs.monthlyChurn}% / month
                        </span>
                      </div>
                      <input
                        id="ltv-churn"
                        type="range"
                        min="0.5"
                        max="15"
                        step="0.1"
                        value={ltvInputs.monthlyChurn}
                        onChange={(e) =>
                          setLtvInputs({ ...ltvInputs, monthlyChurn: Number(e.target.value) })
                        }
                        className="mt-2 w-full accent-primary"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold">
                        <label htmlFor="ltv-cac">Customer Acquisition Cost (CAC)</label>
                        <span className="tabular-nums text-foreground">
                          {formatCurrency(ltvInputs.cac)}
                        </span>
                      </div>
                      <input
                        id="ltv-cac"
                        type="range"
                        min="50"
                        max="10000"
                        step="25"
                        value={ltvInputs.cac}
                        onChange={(e) =>
                          setLtvInputs({ ...ltvInputs, cac: Number(e.target.value) })
                        }
                        className="mt-2 w-full accent-primary"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right Column: Calculated Outputs Card */}
            <div className="glass flex flex-col justify-between rounded-2xl border-2 border-primary/20 bg-card/60 p-6 sm:p-8 lg:col-span-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                  Live Computed Results
                </span>

                {activeSlug === "tam-sam-som" && (
                  <div className="mt-6 space-y-6">
                    <div className="rounded-xl border border-border/70 bg-background/50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Total Addressable Market (TAM)
                      </p>
                      <p className="mt-1 font-display text-3xl font-black text-foreground">
                        {formatCurrency(calcTam)}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        100% global category demand
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-xl border border-border/70 bg-background/50 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Serviceable (SAM)
                        </p>
                        <p className="mt-1 font-display text-xl font-bold text-accent">
                          {formatCurrency(calcSam)}
                        </p>
                      </div>
                      <div className="rounded-xl border border-primary/40 bg-primary/5 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                          Obtainable (SOM)
                        </p>
                        <p className="mt-1 font-display text-xl font-bold text-primary">
                          {formatCurrency(calcSom)}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-xl border border-border/70 bg-background/40 p-4">
                      <p className="text-xs font-semibold text-muted-foreground">
                        Required Paying Accounts to Hit SOM:
                      </p>
                      <p className="mt-1 text-2xl font-black text-foreground">
                        {formatNumber(requiredAccounts, 0)} accounts
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        At {formatCurrency(tamInputs.acv)} ACV per year.
                      </p>
                    </div>
                  </div>
                )}

                {activeSlug === "runway" && (
                  <div className="mt-6 space-y-6">
                    <div className="rounded-xl border border-border/70 bg-background/50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Estimated Cash Runway
                      </p>
                      <p className="mt-1 font-display text-4xl font-black text-foreground">
                        {Number.isFinite(runwayMonths)
                          ? `${runwayMonths.toFixed(1)} Months`
                          : "Indefinite"}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {runwayMonths < 6
                          ? "Critical runway warning (< 6 months)"
                          : runwayMonths < 12
                            ? "Moderate runway (fundraise now)"
                            : "Comfortable execution window"}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-xl border border-border/70 bg-background/50 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Net Monthly Burn
                        </p>
                        <p className="mt-1 font-display text-xl font-bold text-destructive">
                          {formatCurrency(netMonthlyBurn)}
                        </p>
                      </div>
                      <div className="rounded-xl border border-border/70 bg-background/50 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Fundraise Start
                        </p>
                        <p className="mt-1 font-display text-xl font-bold text-foreground">
                          In {safeFundraiseStart.toFixed(1)} Mo
                        </p>
                      </div>
                    </div>

                    <div
                      className={`flex items-center gap-2.5 rounded-xl border p-4 ${isDefaultAlive ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600" : "border-amber-500/40 bg-amber-500/10 text-amber-700"}`}
                    >
                      {isDefaultAlive ? (
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 shrink-0 text-amber-500" />
                      )}
                      <div className="text-xs leading-snug">
                        <span className="font-bold">
                          {isDefaultAlive
                            ? "Default Alive / Profitable"
                            : "Default Dead Trajectory"}
                        </span>
                        <p className="text-[11px] opacity-85">
                          {isDefaultAlive
                            ? "Current revenues surpass gross expenses."
                            : "Must reach breakeven or secure capital before cash runs out."}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeSlug === "break-even" && (
                  <div className="mt-6 space-y-6">
                    <div className="rounded-xl border border-border/70 bg-background/50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Break-Even Volume Required
                      </p>
                      <p className="mt-1 font-display text-4xl font-black text-foreground">
                        {Number.isFinite(breakEvenUnits)
                          ? `${formatNumber(breakEvenUnits, 0)} Units`
                          : "N/A"}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Units sold per month to cover all fixed expenses
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-xl border border-border/70 bg-background/50 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Break-Even Revenue
                        </p>
                        <p className="mt-1 font-display text-lg font-bold text-primary">
                          {formatCurrency(breakEvenRevenue)}
                        </p>
                      </div>
                      <div className="rounded-xl border border-border/70 bg-background/50 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Contrib. Margin
                        </p>
                        <p className="mt-1 font-display text-lg font-bold text-foreground">
                          {formatCurrency(contribMarginUnit)} ({contribMarginRatio.toFixed(0)}%)
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeSlug === "cac" && (
                  <div className="mt-6 space-y-6">
                    <div className="rounded-xl border border-border/70 bg-background/50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Customer Acquisition Cost (CAC)
                      </p>
                      <p className="mt-1 font-display text-4xl font-black text-foreground">
                        {formatCurrency(calculatedCac)}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Blended sales and marketing outlay per acquired buyer
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-xl border border-border/70 bg-background/50 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          CAC Payback Time
                        </p>
                        <p className="mt-1 font-display text-xl font-bold text-foreground">
                          {Number.isFinite(cacPaybackMonths)
                            ? `${cacPaybackMonths.toFixed(1)} Months`
                            : "—"}
                        </p>
                      </div>
                      <div className="rounded-xl border border-border/70 bg-background/50 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Gross Profit / Cust
                        </p>
                        <p className="mt-1 font-display text-xl font-bold text-emerald-600">
                          {formatCurrency(monthlyGrossProfitCustomer)}/mo
                        </p>
                      </div>
                    </div>

                    <div className="rounded-xl border border-border/70 bg-background/40 p-4 text-xs">
                      <p className="font-semibold text-foreground">Benchmark Verdict:</p>
                      <p className="mt-1 text-muted-foreground">
                        {cacPaybackMonths <= 12
                          ? "Exceptional: Payback under 12 months allows rapid compounding reinvestment."
                          : cacPaybackMonths <= 18
                            ? "Healthy: Standard B2B SaaS venture payback window (12 to 18 months)."
                            : "High Risk: Payback exceeds 18 months; requires high capital reserves."}
                      </p>
                    </div>
                  </div>
                )}

                {activeSlug === "ltv" && (
                  <div className="mt-6 space-y-6">
                    <div className="rounded-xl border border-border/70 bg-background/50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Customer Lifetime Value (LTV)
                      </p>
                      <p className="mt-1 font-display text-4xl font-black text-foreground">
                        {formatCurrency(calculatedLtv)}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Cumulative gross margin contribution over buyer lifespan
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-xl border border-primary/40 bg-primary/5 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                          LTV:CAC Ratio
                        </p>
                        <p className="mt-1 font-display text-2xl font-black text-primary">
                          {ltvCacRatio.toFixed(1)} : 1
                        </p>
                      </div>
                      <div className="rounded-xl border border-border/70 bg-background/50 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Avg Lifespan
                        </p>
                        <p className="mt-1 font-display text-xl font-bold text-foreground">
                          {customerLifespanMonths.toFixed(0)} Months
                        </p>
                      </div>
                    </div>

                    <div className="rounded-xl border border-border/70 bg-background/40 p-4 text-xs">
                      <p className="font-semibold text-foreground">Ratio Assessment:</p>
                      <p className="mt-1 text-muted-foreground">
                        {ltvCacRatio >= 3 && ltvCacRatio <= 5
                          ? "Golden 3:1 Standard: Optimal balance of customer value and acquisition efficiency."
                          : ltvCacRatio < 1
                            ? "Critical Alert: Losing money on every acquired customer."
                            : ltvCacRatio < 3
                              ? "Sub-Optimal: Margins may struggle to cover fixed company overhead."
                              : "High Efficiency: >5:1 indicates underinvestment in marketing channels; accelerate spend."}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 border-t border-border pt-4">
                <p className="text-[11px] font-mono text-muted-foreground/80">
                  Formula: {activeCalc.formula_text}
                </p>
              </div>
            </div>
          </div>

          {/* Directory of 5 Tools */}
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              All Operator Calculators
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Select any calculator above to run customized scenarios or review the mathematical
              breakdown.
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {USEFUL_CALCULATORS.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    setActiveSlug(c.slug);
                    window.scrollTo({ top: 300, behavior: "smooth" });
                  }}
                  className="glass flex cursor-pointer flex-col justify-between rounded-2xl p-6 transition-all hover:border-primary/50 hover:shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                        {c.category}
                      </span>
                      {getCalcIcon(c.slug)}
                    </div>
                    <h3 className="mt-3 font-display text-lg font-bold tracking-tight">{c.name}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {c.description}
                    </p>
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-3 text-xs font-semibold text-primary">
                    <span>Open Calculator</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SiteShell>
    </>
  );
}
