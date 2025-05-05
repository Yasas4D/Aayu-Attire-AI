
 // src/app/privacy/page.tsx

 export default function PrivacyPolicyPage() {
   return (
     <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
       <div className="max-w-3xl mx-auto prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert">
         <h1 className="text-primary">Privacy Policy</h1>
         <p><em>Last Updated: {new Date().toLocaleDateString()}</em></p>

         <h2>Introduction</h2>
         <p>
           Welcome to Aayu Lookbook ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us using the details provided on our Contact Us page.
         </p>
         <p>
           This privacy notice describes how we might use your information if you visit our website at [Your Website URL], or otherwise engage with us.
         </p>

         <h2>Information We Collect</h2>
         <p>
           We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website or otherwise when you contact us.
         </p>
         <p>
           The personal information that we collect depends on the context of your interactions with us and the website, the choices you make and the products and features you use. The personal information we collect may include the following:
         </p>
         <ul>
           <li>Personal Information Provided by You: Name, phone number, email address, mailing address, usernames, passwords, contact preferences, billing address, debit/credit card numbers, and other similar information.</li>
           <li>Payment Data: We may collect data necessary to process your payment if you make purchases, such as your payment instrument number (such as a credit card number), and the security code associated with your payment instrument. All payment data is stored by our payment processor and you should review its privacy policies and contact the payment processor directly to respond to your questions.</li>
           <li>Information automatically collected: We automatically collect certain information when you visit, use or navigate the website. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our website and other technical information.</li>
         </ul>

         <h2>How We Use Your Information</h2>
         <p>
           We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
         </p>
         <ul>
            <li>To facilitate account creation and logon process.</li>
            <li>To post testimonials (with your consent).</li>
            <li>Request feedback.</li>
            <li>To enable user-to-user communications (with user consent).</li>
            <li>To manage user accounts.</li>
            <li>To send administrative information to you.</li>
            <li>To protect our Services.</li>
            <li>To enforce our terms, conditions and policies for business purposes, to comply with legal and regulatory requirements or in connection with our contract.</li>
            <li>To respond to legal requests and prevent harm.</li>
            <li>Fulfill and manage your orders.</li>
            <li>To deliver and facilitate delivery of services to the user.</li>
            <li>To respond to user inquiries/offer support to users.</li>
            <li>To send you marketing and promotional communications.</li>
            <li>Deliver targeted advertising to you.</li>
         </ul>


         <h2>Will Your Information Be Shared With Anyone?</h2>
          <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>
         {/* Add more details on sharing: service providers, legal requirements, etc. */}


         <h2>How Long Do We Keep Your Information?</h2>
         <p>We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law.</p>

         <h2>How Do We Keep Your Information Safe?</h2>
         <p>We aim to protect your personal information through a system of organizational and technical security measures.</p>
         {/* Add brief details on security measures */}


         <h2>Your Privacy Rights</h2>
         <p>In some regions (like the EEA and UK), you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time.</p>
          {/* Add details on rights: access, correction, deletion, etc. */}


         <h2>Updates To This Notice</h2>
         <p>We may update this privacy notice from time to time. The updated version will be indicated by an updated "Last Updated" date and the updated version will be effective as soon as it is accessible.</p>

         <h2>How Can You Contact Us About This Notice?</h2>
         <p>
           If you have questions or comments about this notice, you may contact us via the details on our <a href="/contact" className="text-primary hover:underline">Contact Us</a> page.
         </p>
       </div>
     </div>
   );
 }

 // Add styling for prose if not already globally defined
 // e.g., in globals.css or using @tailwindcss/typography plugin
