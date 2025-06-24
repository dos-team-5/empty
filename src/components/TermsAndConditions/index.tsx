export default function TermsAndConditions() {
  return (
    <div className="mt-16 min-h-screen bg-white select-none">
      <div className="mx-auto mb-20 max-w-4xl px-6 py-12 shadow-lg">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            EMPTY ADVERTISING INC.
          </h1>
          <h2 className="mb-2 text-2xl font-semibold text-gray-800">
            Driver Participation Agreement
          </h2>
          <p className="text-gray-600">
            Effective Date: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div
          style={{
            backgroundImage: "url('/EMPTY-watermark.png')",
          }}
        >
          {/* Introduction */}
          <div className="mb-8">
            <p className="leading-relaxed text-gray-700">
              This Driver Participation Agreement (&quot;Agreement&quot;) is
              entered into by and between the undersigned independent contractor
              (&quot;Driver&quot;) and Empty Advertising Inc.
              (&quot;Empty&quot;, &quot;we&quot;, &quot;our&quot;, or
              &quot;us&quot;), a company organized and existing under the laws
              of the Province of Québec. This Agreement outlines the terms and
              conditions under which the Driver agrees to participate in
              advertising campaigns offered by Empty.
            </p>
          </div>

          {/* Section 1 */}
          <section className="mb-8">
            <h3 className="mb-4 text-xl font-semibold text-gray-900">
              1. Independent Contractor Status
            </h3>
            <p className="mb-4 leading-relaxed text-gray-700">
              The Driver acknowledges and agrees that they are participating in
              the Empty platform as an independent contractor, and nothing in
              this Agreement shall be construed to create an employment,
              partnership, joint venture, agency, or fiduciary relationship. The
              Driver remains solely responsible for their tax obligations,
              insurance coverage, and compliance with applicable laws.
            </p>

            <h4 className="mb-3 text-lg font-medium text-gray-800">
              Tax Responsibility
            </h4>
            <p className="mb-4 leading-relaxed text-gray-700">
              Empty shall not withhold or remit any income tax, employment
              insurance (EI), Canada Pension Plan (CPP) contributions, GST/HST,
              or any other statutory deductions on behalf of the Driver.
            </p>
            <p className="mb-4 leading-relaxed text-gray-700">
              The Driver is solely responsible for determining and fulfilling
              any and all tax obligations arising from payments received under
              this Agreement, including the requirement to report such income to
              the Canada Revenue Agency (CRA) or any other applicable tax
              authority. Empty may provide a summary of payments made during the
              calendar year upon written request, but shall not issue T4, T4A,
              or RL-1 slips unless otherwise required by law.
            </p>

            <h4 className="mb-3 text-lg font-medium text-gray-800">
              Injury Coverage – Automobile Insurance Act and AIAOD
            </h4>
            <p className="mb-4 leading-relaxed text-gray-700">
              The Driver acknowledges and agrees that they are participating as
              an independent contractor and are not covered by Québec&apos;s Act
              respecting industrial accidents and occupational diseases (AIAOD)
              or by CNESST protections.
            </p>
            <p className="mb-4 leading-relaxed text-gray-700">
              The Driver further understands that in the event of a motor
              vehicle accident, any injury or damage will be subject to the
              provisions of Québec&apos;s Automobile Insurance Act, administered
              by the Société de l&apos;assurance automobile du Québec (SAAQ).
              All claims, compensation, and rehabilitation in relation to such
              incidents shall be handled by the SAAQ, in accordance with its
              no-fault coverage policies.
            </p>
            <p className="mb-4 leading-relaxed text-gray-700">
              The Driver is solely responsible for maintaining valid automobile
              insurance and may choose to obtain additional private or voluntary
              coverage, including optional CNESST registration, at their
              discretion. Empty assumes no liability for any personal injury,
              financial loss, or insurance dispute arising from the operation of
              the Driver&apos;s vehicle.
            </p>

            <h4 className="mb-3 text-lg font-medium text-gray-800">
              Insurance and Liability for Vehicle Damage
            </h4>
            <p className="mb-4 leading-relaxed text-gray-700">
              The Driver acknowledges that participation in the Empty program is
              as an independent contractor, and that Empty does not provide any
              automobile or commercial liability insurance coverage.
            </p>
            <p className="mb-2 leading-relaxed text-gray-700">
              The Driver is solely responsible for maintaining valid and
              sufficient insurance coverage for:
            </p>
            <ul className="mb-4 list-disc pl-6 text-gray-700">
              <li>
                Material damage to their vehicle (e.g., collision, vandalism,
                wear from decal use)
              </li>
              <li>Third-party liability</li>
              <li>
                Any modifications or risks associated with displaying a decal on
                their vehicle
              </li>
            </ul>
            <p className="mb-2 leading-relaxed text-gray-700">
              Empty shall not be liable for any property damage, insurance claim
              denials, premium increases, or financial losses resulting from:
            </p>
            <ul className="mb-4 list-disc pl-6 text-gray-700">
              <li>Participation in a campaign;</li>
              <li>Installation or removal of advertising materials;</li>
              <li>Use of the vehicle while decals are displayed;</li>
              <li>
                Accidents or damage occurring while operating the vehicle.
              </li>
            </ul>
            <p className="leading-relaxed text-gray-700">
              The Driver is responsible for confirming that participation in the
              program does not conflict with their ride-share platform&apos;s
              terms (e.g., Uber, Lyft) or their personal or commercial vehicle
              insurance policy.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-8">
            <h3 className="mb-4 text-xl font-semibold text-gray-900">
              2. Campaign Participation
            </h3>
            <p className="mb-2 leading-relaxed text-gray-700">
              Upon successful onboarding and verification, the Driver may
              receive offers to participate in advertising campaigns.
              Participation is voluntary. Once a campaign is accepted, the
              Driver agrees to:
            </p>
            <ul className="mb-4 list-disc pl-6 text-gray-700">
              <li>Properly install the advertising decal as instructed;</li>
              <li>Submit photographic proof of installation;</li>
              <li>
                Maintain the decal in good condition, clean, and clearly visible
                throughout the campaign;
              </li>
              <li>
                Continue active rides-hare driving during the campaign period;
              </li>
              <li>
                Keep the &quot;Evertrack&quot; application open during campaign
                hours for &apos;Base Plan&apos; Campaigns;
              </li>
              <li>
                Keep the physical GPS given to them at the start of the campaign
                in their car at all times for &apos;Premium Plan&apos;
                Campaigns;
              </li>
              <li>
                Provide timely updates upon request regarding the condition of
                the decal and your driving activity. This includes submitting
                weekly photo verification and maintaining consistent location
                tracking through the Evertrack GPS system.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="mb-8">
            <h3 className="mb-4 text-xl font-semibold text-gray-900">
              3. Decal Technology and Vehicle Condition
            </h3>
            <p className="mb-4 leading-relaxed text-gray-700">
              Empty utilizes decals manufactured to a standard suitable for use
              on consumer vehicles. These decals are designed to be removable
              and are made with materials tested to avoid causing damage to
              vehicle surfaces. However, the Driver acknowledges that:
            </p>
            <ul className="mb-4 list-disc pl-6 text-gray-700">
              <li>
                Vehicle conditions vary, and decal performance may differ based
                on paint quality, surface temperature, and other environmental
                factors;
              </li>
              <li>
                Empty makes no warranty, express or implied, regarding the
                effect of decal application or removal on the Driver&apos;s
                vehicle;
              </li>
              <li>
                The Driver accepts full responsibility for any cosmetic or
                material damage, including but not limited to adhesive residue,
                fading, or surface abrasion.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="mb-8">
            <h3 className="mb-4 text-xl font-semibold text-gray-900">
              4. Driver Liability and Vehicle Use
            </h3>
            <p className="mb-2 leading-relaxed text-gray-700">
              The Driver is solely and entirely responsible for the operation
              and condition of their vehicle. Empty shall not be liable for:
            </p>
            <ul className="mb-4 list-disc pl-6 text-gray-700">
              <li>
                Any traffic infractions, parking violations, or legal penalties
                incurred by the Driver;
              </li>
              <li>
                Accidents, damage, or injuries involving the Driver, their
                vehicle, or any third party;
              </li>
              <li>
                Insurance coverage, disputes, lapses, denials, or claims arising
                from the presence or use of advertising materials;
              </li>
              <li>
                Any mechanical failures, maintenance issues, cosmetic wear, or
                diminished resale value related to decal installation or
                removal;
              </li>
              <li>
                Any civil or criminal proceedings initiated as a result of the
                Driver&apos;s conduct while participating in the program;
              </li>
              <li>
                Any damage resulting from installation, removal, or modification
                of the decal by the Driver or third parties;
              </li>
              <li>
                Any business interruption, financial loss, or loss of rideshare
                or vehicle privileges caused by participation in a campaign.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="mb-8">
            <h3 className="mb-4 text-xl font-semibold text-gray-900">
              5. Compensation and Payment
            </h3>
            <p className="leading-relaxed text-gray-700">
              Compensation is conditional upon fulfillment of all campaign
              participation requirements outlined in Section 2, as well as
              accurate submission of banking details. Payments are issued via
              direct deposit or such other method specified by Empty. Empty is
              not liable for failed or delayed payments due to incorrect or
              incomplete banking information provided by the Driver.
            </p>
          </section>

          {/* Section 6 */}
          <section className="mb-8">
            <h3 className="mb-4 text-xl font-semibold text-gray-900">
              6. Documentation and Verification
            </h3>
            <p className="mb-4 leading-relaxed text-gray-700">
              To ensure proper campaign placement and payment, the Driver agrees
              to provide any documentation reasonably requested by Empty,
              including identity verification, proof of rideshare activity,
              banking details, and photo updates as outlined in Sections 2 and
              5. The requested documentation will be used solely for identity
              verification, campaign coordination, and payment processing.
              Failure to provide such documentation may result in
              disqualification or payment delays.
            </p>

            <h4 className="mb-3 text-lg font-medium text-gray-800">
              Data Privacy and Authorization
            </h4>
            <p className="leading-relaxed text-gray-700">
              By submitting this information, the Driver authorizes Empty to
              securely collect, store, and process the data provided in
              accordance with applicable privacy laws, including but not limited
              to the Act Respecting the Protection of Personal Information in
              the Private Sector (Québec).
            </p>
          </section>

          {/* Section 7 */}
          <section className="mb-8">
            <h3 className="mb-4 text-xl font-semibold text-gray-900">
              7. Location Tracking and Consent
            </h3>
            <p className="mb-2 leading-relaxed text-gray-700">
              As part of campaign monitoring, Empty may use GPS tracking
              technology to verify the driving activity and geographic exposure
              of advertising decals. The Driver acknowledges and consents to the
              use of tracking for the following purposes:
            </p>
            <ul className="mb-4 list-disc pl-6 text-gray-700">
              <li>
                Confirming that the vehicle is in motion and within active
                campaign zones;
              </li>
              <li>
                Verifying compliance with minimum driving hour requirements;
              </li>
              <li>Estimating campaign impressions and audience reach;</li>
              <li>Detecting fraud;</li>
              <li>Improving operational efficiency;</li>
              <li>Providing reporting to advertisers, and</li>
              <li>
                For such other purposes reasonably consistent with the
                objectives of this Agreement and permitted by applicable law.
              </li>
            </ul>
            <p className="mb-4 leading-relaxed text-gray-700">
              GPS data may be collected using third-party apps or tracking
              software installed on the Driver&apos;s mobile device or other
              authorized methods. The Driver may revoke tracking consent at any
              time by written notice. However, doing so may result in immediate
              disqualification from current and future campaigns.
            </p>

            <h4 className="mb-3 text-lg font-medium text-gray-800">
              Privacy Protection
            </h4>
            <p className="leading-relaxed text-gray-700">
              All GPS and location data collected during campaign participation
              is handled in accordance with Quebec privacy laws. This data is
              used to verify driving activity, assess campaign reach, and
              support compliance and analytics. It will be retained only as long
              as necessary for these purposes and will not be sold or used for
              unrelated marketing or third-party profiling.
            </p>
          </section>

          {/* Section 8 */}
          <section className="mb-8">
            <h3 className="mb-4 text-xl font-semibold text-gray-900">
              8. Suspension and Termination
            </h3>
            <p className="mb-2 leading-relaxed text-gray-700">
              Empty reserves the right to suspend or terminate the Driver&apos;s
              access to the platform at any time, with or without notice, for
              any reason, including for reasons such as:
            </p>
            <ul className="mb-4 list-disc pl-6 text-gray-700">
              <li>Violation of this Agreement;</li>
              <li>Failure to fulfill campaign requirements;</li>
              <li>
                Inactivity, misrepresentation or submission of false
                information.
              </li>
            </ul>
            <p className="mb-4 leading-relaxed text-gray-700">
              In addition, Empty may suspend or terminate the Driver&apos;s
              access to the platform without cause, provided that the Driver
              receives reasonable prior written notice.
            </p>
            <p className="leading-relaxed text-gray-700">
              Access to the platform is at the discretion of Empty and does not
              entitle the Driver to any guaranteed campaigns, assignments, or
              compensation.
            </p>
          </section>

          {/* Section 9 */}
          <section className="mb-8">
            <h3 className="mb-4 text-xl font-semibold text-gray-900">
              9. Indemnification
            </h3>
            <p className="mb-2 leading-relaxed text-gray-700">
              The Driver agrees to indemnify, defend, and hold harmless Empty
              and its affiliates, officers, directors, employees, and agents
              from and against any and all claims, damages, liabilities, losses,
              expenses, or demands arising from:
            </p>
            <ul className="mb-4 list-disc pl-6 text-gray-700">
              <li>The Driver&apos;s use of their vehicle;</li>
              <li>The Driver&apos;s breach of this Agreement;</li>
              <li>
                The Driver&apos;s participation in any campaign under this
                Agreement;
              </li>
              <li>
                Any third-party claim alleging injury, property damage, or other
                loss connected to the Driver&apos;s conduct.
              </li>
            </ul>
          </section>

          {/* Section 10 */}
          <section className="mb-8">
            <h3 className="mb-4 text-xl font-semibold text-gray-900">
              10. Governing Law and Jurisdiction
            </h3>
            <p className="leading-relaxed text-gray-700">
              This Agreement shall be governed by and construed in accordance
              with the laws of the Province of Québec. Any dispute arising under
              or in connection with this Agreement shall be subject to the
              exclusive jurisdiction of the courts of the judicial district of
              Montréal, Québec.
            </p>
          </section>

          {/* Section 11 */}
          <section className="mb-8">
            <h3 className="mb-4 text-xl font-semibold text-gray-900">
              11. Survival
            </h3>
            <p className="leading-relaxed text-gray-700">
              The provisions of this Agreement relating to liability and
              limitations of liability, indemnification, governing law, and data
              privacy shall survive the termination or expiration of this
              Agreement.
            </p>
          </section>

          {/* Section 12 */}
          <section className="mb-8">
            <h3 className="mb-4 text-xl font-semibold text-gray-900">
              12. Entire Agreement
            </h3>
            <p className="leading-relaxed text-gray-700">
              This Agreement constitutes the entire understanding between the
              parties regarding its subject matter and supersedes all prior
              agreements, communications, or understandings, whether written or
              oral.
            </p>
          </section>

          {/* Section 13 */}
          <section className="mb-8">
            <h3 className="mb-4 text-xl font-semibold text-gray-900">
              13. Acknowledgement and Acceptance
            </h3>
            <p className="leading-relaxed text-gray-700">
              By signing below or submitting your consent through our digital
              platform, you confirm that you have read, understood, and agreed
              to be bound by the terms and conditions outlined in this
              Agreement.
            </p>
          </section>
        </div>
      </div>
      {/* Footer */}
      <div className="mt-12 border-t border-gray-200 pt-8">
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Empty Advertising Inc. All rights
          reserved.
        </p>
      </div>
    </div>
  );
}
