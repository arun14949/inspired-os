<h1>A Self-Serve Certificate Generator for Entri</h1>

<h2>A tiny internal tool that rescued our designers from endless certificate-making</h2>
<p><em>Arun Sajeev</em><br/>
4 min read · Dec 12, 2025</p>

<hr/>

<h2>Background (why we were drowning in certificates)</h2>

<p>
At a company our size, celebrations scale faster than humans can design certificates.
At Entri, we celebrate everything. Rank holders. Entripreneurs. Winners. Achievers.
All of it.
</p>

<p>
And every celebration needs a certificate. A lot of certificates.
</p>

<p><em>Before we go further, a quick clarification:</em></p>

<p>
This story is not about our course completion certificates. Those have IDs,
validation pages, backend verification, and a whole ecosystem behind them.
</p>

<p>
This case study is about the event-based, feel-good certificates.
</p>

<p>
The “you did great!” ones. These were made manually by designers.
Every single time.
</p>

<p>
This wasn’t a design problem. It was a scaling problem.
</p>

<hr/>

<h2>The Problem (or how we slowly became a certificate factory)</h2>

<p>
Weekly events kept coming in → tons of certificate requests → designers crying internally.
</p>

<img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*FhHxj6ZumOOemlabeekisw.png" />

<p>A few patterns quickly became obvious:</p>

<ul>
<li>Designers needed <strong>1–2 days</strong> to deliver certificates.</li>
<li>If there were only a few participants, they <strong>manually typed names</strong>.</li>
<li>If there were many participants, designers used <strong>variables and hoped spacing didn’t break</strong>.</li>
<li>Each designer had a different style → <strong>branding consistency suffered</strong>.</li>
<li>Academic teams sometimes asked for <strong>custom certificate designs</strong>.</li>
</ul>

<p>
Basically, we were spending <strong>days every month polishing rectangles with names on them</strong>.
Not the best use of design time.
</p>

<p><em>If other teams are providing the details, why can’t they create the certificates themselves?</em></p>

<p>
Something had to change. Preferably yesterday.
</p>

<hr/>

<h2>Understanding the Requirements</h2>

<p>
I had a chat with the Academic and HR teams expecting simple requests.
</p>

<p>Instead, I got a small shopping list:</p>

<ul>
<li>Can we add <strong>multiple signatures</strong>?</li>
<li>Sometimes we have <strong>partner logos</strong>.</li>
<li>We need <strong>bulk generation… lots of bulk generation</strong>.</li>
<li>Also can we <strong>edit titles and descriptions ourselves</strong>?</li>
</ul>

<p>
So the problem wasn’t making certificates.
</p>

<p>
The problem was making <strong>dozens of slightly different certificates repeatedly</strong>.
</p>

<p>
And because certificates represent official communication,
<strong>access control and security were necessary</strong>.
</p>

<hr/>

<h2>The Experiment (Figma Make to the rescue)</h2>

<p>
I had unlimited credits in <strong>Figma Make</strong> until December 2025, so I wondered:
</p>

<p><em>Can I build a certificate-generating platform without writing a single line of code?</em></p>

<p>Turns out, I could.</p>

<p>
What followed was equal parts <strong>prototyping, prompting, and praying</strong>.
</p>

<h3>Why Figma Make worked beautifully</h3>

<ul>
<li>It could <strong>modify specific elements inside a selected frame</strong></li>
<li>It understood the <strong>structure of my layout</strong> because of Figma metadata</li>
<li>It allowed <strong>rapid conversational iteration</strong></li>
<li>No <strong>engineering dependency for early prototyping</strong></li>
<li>I could tweak layouts and logic using <strong>prompts</strong></li>
</ul>

<p>
The first working draft appeared <strong>within minutes</strong>.
</p>

<p>
Then around <strong>400 prompts later</strong>, I had something stable, flexible,
and ready for real usage.
</p>

<img src="https://miro.medium.com/v2/resize:fit:708/format:webp/1*W9bBMSx8MW7ufw2Pw0Fhdg.png" />

<p><em>Using Figma AI credits like a true Malayali at a free buffet :)</em></p>

<hr/>

<h2>Handling Security</h2>

<p>
Authentication was the only part that couldn’t be solved inside Figma.
</p>

<p>So I coordinated with our engineering team.</p>

<p><strong>Engineering handled</strong></p>

<ul>
<li>Google login authentication</li>
</ul>

<p><strong>I handled</strong></p>

<ul>
<li>The <strong>access code system</strong> for secure downloads</li>
<li><strong>Certificate generation logs</strong> using Google Apps Script</li>
</ul>

<p>The goal was simple:</p>

<ul>
<li>Keep access limited</li>
<li>Track activity</li>
<li>Prevent accidental misuse</li>
</ul>

<hr/>

<h2>Building the Tool</h2>

<p><em>(aka: making certificate creation as easy as typing someone’s name)</em></p>

<p>The final tool lets teams create:</p>

<ul>
<li>Participation certificates</li>
<li>Achievement certificates</li>
<li>Custom-title certificates</li>
</ul>

<p>Teams can customize:</p>

<ul>
<li>Title</li>
<li>Content</li>
<li>Recipient name</li>
<li>Issue date</li>
<li>Partner logos</li>
<li>Multiple signatures</li>
</ul>

<img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Cw8CBRY7Vbr_LG8L1-R8fQ.png" />

<p>
Teams can also upload a <strong>CSV file to generate certificates in bulk</strong>.
</p>

<p>
Everything exports as <strong>print-ready PDFs</strong>.
</p>

<p>
What once took designers <strong>hours now takes teams minutes</strong>.
</p>

<hr/>

<h2>Walkthrough Video</h2>

<p>
Watch the quick walkthrough video:
</p>

<p>
https://youtu.be/BwSigid3_1Q
</p>

<p>
Priyanka created this walkthrough to help teams quickly understand how to use the tool.
</p>

<hr/>

<h2>Rollout (the surprisingly smooth part)</h2>

<p>
The HR and Academic teams jumped in immediately.
</p>

<p>
In the first month alone:
</p>

<p><strong>1300+ certificates were generated.</strong></p>

<p>
That’s nearly a <strong>full quarter of manual design work eliminated</strong>.
</p>

<p>
The tool quietly absorbed an entire category of repetitive work.
</p>

<p>
No one missed doing it. And every team moved faster.
</p>

<hr/>

<h2>Final Thoughts</h2>

<p>
By rethinking a simple workflow and leveraging
<strong>AI prototyping tools</strong>, we turned a repetitive operational task into a
<strong>scalable self-serve platform</strong>.
</p>

<p>
It wasn’t just automation.
</p>

<p>
It was <strong>empowerment</strong>.
</p>

<p>
And sometimes, that’s enough to change how an entire company works.
</p>

<hr/>