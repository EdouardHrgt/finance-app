function BillsPage() {
  return (
    <main className="bills-page page">
      <h1 className="tp1">Bills</h1>
      <section className="bills-page-grid">
        <div className="bills-page-left-col">
          <div className="bills-page-total">
            <img src="/assets/icon-recurring-bills.svg" alt="" />
            <p className="tp4-regular">Total Bills</p>
            <p>
              <strong className="tp1">$384.98</strong>
            </p>
          </div>
          <div className="bills-page-summary">
            <h2 className="tp3 p-dark">Summary</h2>
            <div className="bills-page-summary-card">
              <p className="tp5-regular p-light">Paid Bills</p>
              <p>
                <strong className="p-dark tp5-bold">4($190.00)</strong>
              </p>
            </div>
            <div className="bills-page-summary-card">
              <p className="tp5-regular p-light">Total Upcoming</p>
              <p>
                <strong className="p-dark tp5-bold">4 ($194.98)</strong>
              </p>
            </div>
            <div className="bills-page-summary-card">
              <p className="tp5-regular p-light">Due Soon</p>
              <p>
                <strong className="p-dark tp5-bold ">2 ($59.98)</strong>
              </p>
            </div>
          </div>
        </div>
        <div className="bills-page-right-col">
          {/* LABELS */}
          <section className="bills-page-table">
            <div className="bills-page-table-labels">
              <p className="tp5-regular Bills-page-table-label-first">
                Bill Title
              </p>

              <p className="tp5-regular Bills-page-table-label-date">
                Due Date
              </p>
              <p className="tp5-regular Bills-page-table-label-amount">
                Amount
              </p>
            </div>
            <article className="Bills-page-table-card">
              <div className="Bills-page-table-card-name-img">
                <img src="" alt="" />{/* bill.avatar */}
                <p>
                  <strong className="tp4-bold">{/* bill.name */}</strong>
                </p>
              </div>
              <div className="Bills-page-table-card-date">
                <p className="tp5-regular">Monthly-1st</p>
                <svg
                  fill="none"
                  height="14"
                  viewBox="0 0 14 14"
                  width="14"
                  xmlns="http://www.w3.org/2000/svg"
                  className="not-paid"
                >
                  <path
                    d="m7 .5c-1.28558 0-2.54228.381218-3.6112 1.09545-1.06892.71423-1.90204 1.72939-2.394014 2.91711-.49197 1.18772-.620691 2.49465-.369887 3.75553.250804 1.26087.869871 2.41911 1.778911 3.32811s2.06723 1.5281 3.32811 1.7789c1.26087.2508 2.56781.1221 3.75552-.3699 1.18776-.492 2.20286-1.3251 2.91716-2.394.7142-1.06891 1.0954-2.32562 1.0954-3.6112-.0018-1.72335-.6872-3.37559-1.9058-4.59418-1.2186-1.2186-2.87085-1.904-4.5942-1.90582zm-.5 3.5c0-.13261.05268-.25979.14645-.35355.09377-.09377.22094-.14645.35355-.14645s.25979.05268.35356.14645c.09376.09376.14644.22094.14644.35355v3.5c0 .13261-.05268.25979-.14644.35355-.09377.09377-.22095.14645-.35356.14645s-.25978-.05268-.35355-.14645c-.09377-.09376-.14645-.22094-.14645-.35355zm.5 6.5c-.14833 0-.29334-.044-.41667-.1264-.12334-.0824-.21947-.1995-.27624-.3366-.05676-.13703-.07162-.28783-.04268-.43332.02894-.14548.10037-.27912.20526-.38401s.23853-.17632.38401-.20526c.14549-.02894.29629-.01408.43333.04268.13705.05677.25418.1529.33659.27623.08242.12334.1264.26834.1264.41668 0 .19891-.07902.3897-.21967.5303-.14065.1407-.33141.2197-.53033.2197z"
                    fill="#c94736"
                  />
                </svg>
                {/* if the bill is paid display this svg and hide the other one 
                <svg className="paid" fill="none" height="14" viewBox="0 0 14 14" width="14" xmlns="http://www.w3.org/2000/svg"><path d="m7 .5c-1.28558 0-2.54228.381218-3.6112 1.09545-1.06892.71423-1.90204 1.72939-2.394014 2.91711-.49197 1.18772-.620691 2.49465-.369887 3.75553.250804 1.26087.869871 2.41911 1.778911 3.32811s2.06723 1.5281 3.32811 1.7789c1.26087.2508 2.56781.1221 3.75552-.3699 1.18776-.492 2.20286-1.3251 2.91716-2.394.7142-1.06891 1.0954-2.32562 1.0954-3.6112-.0018-1.72335-.6872-3.37559-1.9058-4.59418-1.2186-1.2186-2.87085-1.904-4.5942-1.90582zm2.85375 5.35375-3.5 3.5c-.04643.04649-.10158.08337-.16228.10853s-.12576.03811-.19147.03811c-.0657 0-.13077-.01295-.19147-.03811s-.11584-.06204-.16228-.10853l-1.5-1.5c-.09382-.09382-.14653-.22107-.14653-.35375s.05271-.25993.14653-.35375.22107-.14653.35375-.14653.25993.05271.35375.14653l1.14625 1.14688 3.14625-3.14688c.04646-.04646.10161-.08331.1623-.10845.0607-.02514.12576-.03808.19145-.03808.0657 0 .13075.01294.19145.03808s.11585.06199.1623.10845c.04646.04645.08331.10161.10845.1623.02514.0607.0381.12575.0381.19145s-.01296.13075-.0381.19145c-.02514.06069-.06199.11585-.10845.1623z" fill="#277c78"/></svg> 
                */}
              </div>
              <div className="Bills-page-table-card-amount">
                <p>
                  <strong className="tp4-bold">{/* formatAmount(bill.amount) */}</strong>
                </p>
              </div>
            </article>
          </section>
        </div>
      </section>
    </main>
  );
}

export default BillsPage;
