/* eslint-disable @next/next/no-html-link-for-pages */
import { Metadata } from "next";
import PublicLayout from "../layouts/layout-public";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy",
};

export default function Privacy() {
  return (
    <PublicLayout>
      <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base/7 text-gray-700">
        <p className="text-base/7 font-semibold text-indigo-600">Effective Date: <span id="date">11/4/2024</span></p>
        <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
        Privacy Policy
        </h1>
        <p className="mt-6 text-xl/8">
        Maywood Sportsmen&apos;s Club (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your information when you visit our website <strong>maywoodsc.org</strong> (the &quot;Site&quot;). By using our Site, you agree to the terms of this Privacy Policy.
        </p>
        
        <div className="py-4 py-4">
          <h2 className="text-2xl font-semibold text-gray-800">1. Information We Collect</h2>
          <p className="text-lg text-gray-700">
            We may collect the following types of information when you use our Site:
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
            <li><strong>Personal Information:</strong> When you visit our Site, we may collect personal information that you voluntarily provide, such as:
              <ul className="list-inside list-decimal pl-5 space-y-2">
                <li>Name</li>
                <li>Email address</li>
                <li>Mailing address</li>
                <li>Phone number</li>
                <li>Payment information (for donations or memberships)</li>
              </ul>
            </li>
            <li><strong>Non-Personal Information:</strong> We may also collect non-personal information, including:
              <ul className="list-inside list-decimal pl-5 space-y-2">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device type</li>
                <li>Referring website or page</li>
                <li>Pages viewed on our Site</li>
                <li>Time and date of visits</li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="py-4">
          <h2 className="text-2xl font-semibold text-gray-800">2. How We Use Your Information</h2>
          <p className="text-lg text-gray-700">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
            <li>Provide services to our members and visitors</li>
            <li>Process membership applications, donations, and event registrations</li>
            <li>Send newsletters, updates, and other communications about our activities and events</li>
            <li>Improve our website and ensure it functions correctly</li>
            <li>Comply with legal and regulatory obligations</li>
          </ul>
          <p className="text-lg text-gray-700">
            If you choose to receive communications from us (such as newsletters), you may opt-out at any time by following the instructions in the emails or by contacting us directly.
          </p>
        </div>

        <div className="py-4">
          <h2 className="text-2xl font-semibold text-gray-800">3. Cookies and Tracking Technologies</h2>
          <p className="text-lg text-gray-700">
            Our Site may use cookies and similar tracking technologies to improve the user experience. Cookies are small files stored on your device that allow us to recognize your preferences and provide a more personalized experience.
          </p>
          <p className="text-lg text-gray-700">
            You can manage your cookie preferences through your web browser settings. However, please note that disabling cookies may affect your experience on our Site.
          </p>
        </div>

        <div className="py-4">
          <h2 className="text-2xl font-semibold text-gray-800">4. How We Protect Your Information</h2>
          <p className="text-lg text-gray-700">
            We take reasonable security measures to protect your personal information from unauthorized access, disclosure, or alteration. However, no data transmission over the internet or storage system can be guaranteed to be 100% secure, so we cannot ensure the absolute security of your data.
          </p>
        </div>

        <div className="py-4">
          <h2 className="text-2xl font-semibold text-gray-800">5. Disclosure of Your Information</h2>
          <p className="text-lg text-gray-700">
            We do not sell, rent, or trade your personal information to third parties. However, we may share your information with trusted third-party service providers who assist us in running our website and conducting business operations (e.g., payment processors, email service providers, etc.). These third parties are obligated to keep your information confidential and use it only for the purposes for which we have shared it.
          </p>
          <p className="text-lg text-gray-700">
            We may also disclose your information when required by law, in response to legal requests, or to protect the rights, property, or safety of Maywood Sportsmen&apos;s Club, its members, or others.
          </p>
        </div>

        <div className="py-4">
          <h2 className="text-2xl font-semibold text-gray-800">6. Your Rights and Choices</h2>
          <p className="text-lg text-gray-700">
            As a visitor or member, you have the following rights regarding your personal information:
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
            <li><strong>Access:</strong> You can request access to the personal information we hold about you.</li>
            <li><strong>Correction:</strong> You can request that we update or correct any inaccuracies in your personal information.</li>
            <li><strong>Deletion:</strong> You can request that we delete your personal information, subject to any legal or contractual obligations we may have.</li>
            <li><strong>Opt-out:</strong> You can opt-out of receiving marketing emails or other communications from us by following the instructions in those communications or by contacting us directly.</li>
          </ul>
          <p className="text-lg text-gray-700">
            To exercise these rights, please contact us at <strong>webmaster@maywoodsc.org</strong>.
          </p>
        </div>

        <div className="py-4">
          <h2 className="text-2xl font-semibold text-gray-800">7. Third-Party Links</h2>
          <p className="text-lg text-gray-700">
            Our Site may contain links to other websites that are not operated or controlled by Maywood Sportsmen&apos;s Club. We are not responsible for the privacy practices of those websites. We encourage you to review the privacy policies of any third-party sites you visit.
          </p>
        </div>

        <div className="py-4">
          <h2 className="text-2xl font-semibold text-gray-800">8. Children&apos;s Privacy</h2>
          <p className="text-lg text-gray-700">
            Our Site is not intended for children under the age of 13, and we do not knowingly collect or solicit personal information from children. If we become aware that we have inadvertently collected personal information from a child under 13, we will take steps to delete that information as quickly as possible.
          </p>
        </div>

        <div className="py-4">
          <h2 className="text-2xl font-semibold text-gray-800">9. Changes to This Privacy Policy</h2>
          <p className="text-lg text-gray-700">
            We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or services. When we update the policy, we will post the revised version on our website with an updated effective date. We encourage you to review this policy periodically.
          </p>
        </div>


        <div className="py-4">
          <h2 className="text-2xl font-semibold text-gray-800">10. Contact Us</h2>
          <p className="text-lg text-gray-700">
            If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at:
          </p>
          <p className="text-lg text-gray-700">
            Maywood Sportsmen&apos;s Club<br/>
            <strong>700 N County Line Rd, Elmhurst, IL 60126</strong><br/>
            Email: <strong>webmaster@maywoodsc.org</strong>
          </p>
        </div>
      </div>
    </div>

    </PublicLayout>
  )
}
