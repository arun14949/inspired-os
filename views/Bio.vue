<template>
<div>
    <img class="w-full h-auto" src="@/assets/Biography/self.jpg" />
    <h2 class="font-bold text-2xl py-5">Don Chia (谢祺恩)</h2>
    <h4 class="text-gray-600 font-medium text-xs" style="padding-bottom: 10px">
        CTO @ Randamu Anime •  Apple WWDC 2021 & 2022 SSC Scholar
    </h4>
    <h4 class="text-gray-600 font-medium text-xs">Singapore 📍</h4>

    <div class="flex flex-wrap mt-5 gap-2 items-center">
        <img class="w-auto h-5 rounded-none text-xs" alt="Swift" src="https://img.shields.io/badge/-Swift-orange" />
        <img class="w-auto h-5 rounded-none text-xs" alt="Python" src="https://img.shields.io/badge/-Python-blue" />
        <img class="w-auto h-5 rounded-none text-xs" alt="JavaScript" src="https://img.shields.io/badge/-Javascript-yellow" />
        <img class="w-auto h-5 rounded-none text-xs" alt="SQL" src="https://img.shields.io/badge/-SQL-lightgrey" />
        <img class="w-auto h-5 rounded-none text-xs" alt="Git" src="https://img.shields.io/badge/-Git-critical" />
        <img class="w-auto h-5 rounded-none text-xs" alt="HTML/CSS" src="https://img.shields.io/badge/-HTML%2FCSS-yellowgreen" />
        <img class="w-auto h-5 rounded-none text-xs" alt="SwiftUI" src="https://img.shields.io/badge/-SwiftUI-3e8bc3" />
        <img class="w-auto h-5 rounded-none text-xs" alt="React Native" src="https://img.shields.io/badge/-React%20Native-blue" />
        <img class="w-auto h-5 rounded-none text-xs" alt="Vue" src="https://img.shields.io/badge/-VueJS-61b083" />
        <img class="w-auto h-5 rounded-none text-xs" alt="Flask" src="https://img.shields.io/badge/-Flask-406893" />
        <img class="w-auto h-5 rounded-none text-xs" alt="MongoDB" src="https://img.shields.io/badge/-MongoDB-4ca158" />
        <img class="w-auto h-5 rounded-none text-xs" alt="SQLite" src="https://img.shields.io/badge/-SQLite-64a2c9" />
        <img class="w-auto h-5 rounded-none text-xs" alt="Figma" src="https://img.shields.io/badge/-Figma-8c5aee" />
    </div>

    <div class="pt-7">
        <h3 class="underline font-bold text-md pb-1">About Me</h3>
        <p class="font-thin text-sm pb-2.5">
            I’m a {{ new Date().getFullYear() - 2003 }} year old software engineer who’s a React Native and Vue.JS engineer by day but a native iOS developer by night. Crafting impactful software that serves my community and people around me is my passion.
        </p>
        <p class="font-thin text-sm pb-2.5">
            I thrive on staying updated with the latest design trends and development frameworks across all platforms. While my heart lies in native app design and development, I also excel in cross-platform app and web development, which keeps the bills paid.
        </p>
        <p class="font-thin text-sm pb-2.5">
            At 17, I co-founded NOSSAFLEX with developers from Australia and the US. Since then, it has garnered attention, being featured on local television, Apple’s annual Entrepreneur Camp, and earning a nomination from Apple’s regional team for their annual design awards.
        </p>
        <p class="font-thin text-sm pb-2.5">
            Having collaborated with diverse companies worldwide, from e-commerce to art and design industries, I've honed the ability to manage multiple projects simultaneously across various time zones.
        </p>
        <p class="font-thin text-sm pb-2.5">
            In my spare time, I indulge in scrolling through analog camera listings or admiring my collection, although shooting has taken a backseat due to my various work commitments.
        </p>
    </div>

    <div class="pt-7">
        <h3 class="underline font-bold text-md pb-1">Work Experience</h3>
    </div>

    <section class="pt-6">
        <h4 class="text-lg font-semibold">Randamu Anime</h4>
        <p class="text-gray-600 text-xs">CTO • Jan 2025 – Present • Ho Chi Minh City, VN & Singapore, SG</p>
        <ul class="list-disc pl-5 mt-2 space-y-1 text-sm font-thin">
            <li>Organized and supervised the design and implementation of Randamu’s digital marketplace using React. Optimized architecture and user experience.</li>
            <li>Collaborated with the Marketing and Events team to run the first creator event at Orchard with thousands of attendees and hundreds of vendors.</li>
            <li>Attended an IP and Licensing Expo in Shanghai. Built APAC licensing network and signed a licensed creator for Randamu.</li>
            <li>Backed by Enterprise SG and incubated under Ngee Ann Polytechnic’s AGILE program.</li>
        </ul>
    </section>

    <section class="pt-6">
        <h4 class="text-lg font-semibold">NOSSAFLEX</h4>
        <p class="text-gray-600 text-xs">iOS Engineer • May 2020 – Aug 2025 • Melbourne, AU & Fredericksburg, USA</p>
        <ul class="list-disc pl-5 mt-2 space-y-1 text-sm font-thin">
            <li>Led iOS frontend development in a cross-border team across the US and Australia.</li>
            <li>Partnered with the lead designer to ship a polished iOS experience aligned with Apple HIG.</li>
            <li>Consulted Apple Design Evangelist and applied MVVM for clean architecture.</li>
            <li>Stack included UIKit, SwiftUI, AVFoundation, Core Data, and Firebase.</li>
        </ul>
    </section>

    <section class="pt-6">
        <h4 class="text-lg font-semibold">SAF Signals Cloud & Digital Office</h4>
        <p class="text-gray-600 text-xs">Software Engineer • Nov 2023 – Aug 2024 • Singapore, SG</p>
        <ul class="list-disc pl-5 mt-2 space-y-1 text-sm font-thin">
            <li>Co-founded the Digital Office in Signals Corps with regulars. Office formally launched in 2025 with command structure and MINDEF funding.</li>
            <li>Built apps with React Native, Firebase, and Flask. Deployed tools to troopers overseas.</li>
            <li>Recognized by Chief of Army, Chief Signals Officer, and formation leaders.</li>
            <li>Worked with Kotlin Jetpack Compose, SwiftUI, Vue3, Pinia, and TailwindCSS.</li>
        </ul>
    </section>

    <section class="pt-6">
        <h4 class="text-lg font-semibold">Fundigo Co.</h4>
        <p class="text-gray-600 text-xs">Project Manager & Fullstack Web Developer • Jun 2022 – Dec 2024 • Singapore, SG</p>
        <ul class="list-disc pl-5 mt-2 space-y-1 text-sm font-thin">
            <li>Led a small international SEA team to deliver quality code and reliable releases.</li>
            <li>Revamped cross-platform UI using Material 3 to improve engagement and clarity.</li>
            <li>Built merchant portal with Vite, Vue3, and Pinia. Applied MVVM patterns with TailwindCSS.</li>
            <li>Funded by Quest Ventures and incubated under SUSS Accelerator.</li>
        </ul>
    </section>

    <section class="pt-6">
        <h4 class="text-lg font-semibold">Current Mobility</h4>
        <p class="text-gray-600 text-xs">iOS Engineer • Oct 2023 – Mar 2024 • Palo Alto, USA</p>
        <ul class="list-disc pl-5 mt-2 space-y-1 text-sm font-thin">
            <li>Shipped an EV charging discovery app using SwiftUI and MapKit.</li>
            <li>Worked with a senior tech lead to support funding milestones.</li>
            <li>Stack included UIKit, SwiftUI, and Firebase.</li>
        </ul>
    </section>

    <div class="pt-10">
        <h3 class="underline font-bold text-md pb-1">Projects & Achievements</h3>
    </div>

    <div class="pt-7">
        <div>
            <h3 class="pb-1"><b>Apple Design Awards 2024</b></h3>
            <h6 class="text-gray-600 font-medium text-xs">Shortlisted Regionally</h6>
            <p class="font-thin text-sm pb-2.5">
                Analog was shortlisted by Apple South Asia Developer Relations team and submitted to Apple Cupertino HQ for consideration in Apple’s annual Design Award. Apple’s South Asia DR team praised Analog for its adherence to Apple’s Human Interaction guidelines while adding a unique UI spin to the application’s design
            </p>
        </div>

        <div class="pt-7">
            <h3 class="pb-1"><b>Apple Entrepreneur Camp 2023</b></h3>
            <h6 class="text-gray-600 font-medium text-xs">Accepted</h6>
            <p class="font-thin text-sm pb-2.5">
                Analog was accepted into Apple’s Entrepreneur Camp 2023, an international programme designed to support developers providing access to Apple Engineers and Leaders to accelerate the growth of their app-driven businesses.
            </p>
        </div>
        
        <div class="pt-7">
            <h3 class="pb-1"><b>SAF Innovation Award 2023 - OMNIA Application by Signals Cloud & Digital Office</b></h3>
            <h6 class="text-gray-600 font-medium text-xs">Awarded</h6>
            <p class="font-thin text-sm pb-2.5">
                OMNIA web application was awarded SAF’s Innovation Award in 2023, it successfully served its purpose as a management app for Exercise Forging Sabre held in Idaho, USA.
            </p>
        </div>

        <div class="pt-7">
            <h3 class="pb-1"><b>Apple WWDC Scholar 2022</b></h3>
            <h6 class="text-gray-600 font-medium text-xs">Awarded</h6>
            <p class="font-thin text-sm pb-2.5">
                Yet another successful attempt at Apple's international coding
                competition. By making use of SwiftUI once more, I created a short app
                experience that explores recursive art patterns and abstract art. With
                the help of generative art, I was able to create a unique experience
                that most people would have rarely come across.
            </p>
            <p class="font-thin text-sm pb-2.5">
                Check out my submission
                <a style="color: #ff5733" href="https://github.com/DonChiaQE/ReGen">here</a>!
            </p>
            <p class="font-thin text-sm pb-2.5">
                As this news has only just recently reached me, I will be updating this
                section once more when I have receive more news from Apple HQ.
            </p>
        </div>

        <div class="pt-7">
            <h3 class="pb-1"><b>Apple WWDC Scholar 2021</b></h3>
            <h6 class="text-gray-600 font-medium text-xs">Awarded</h6>
            <p class="font-thin text-sm pb-2.5">
                My second try at Apple's international coding competition was finally a
                successful one. Making use of my prowess with web development, I decided
                to create a Swift Playground project that taught users how to make use
                of HTML and CSS to create a simple website.
            </p>
            <p class="font-thin text-sm pb-2.5">
                Making use of Apple's SwiftUI framework as well as the nifty WKWebView
                API, I managed to create a working editor that would allow users to
                meddle with HTML and CSS. I proceeded to create a playground book
                project around that idea and came up with a tutorial sequence for the
                user to follow.
            </p>
            <p class="font-thin text-sm pb-2.5">
                Check out my submission
                <a style="color: #ff5733" href="https://github.com/DonChiaQE/WWDC2021">here</a>!
            </p>
            <p class="font-thin text-sm pb-2.5">
                And check out my interview with the local news outlet regarding
                NOSSAFLEX and my WWDC experience
                <a style="color: #ff5733" href="https://www.youtube.com/watch?v=RwtzXxSSJAc">right here</a>!
            </p>
        </div>
    </div>

    <div class="pt-7">
        <h3 class="pb-1"><b>Résumé</b></h3>
        <a style="color: #ff5733" href="/files/don_chia_resume.pdf" class="font-thin text-sm pb-2.5">Check out my résumé here.</a>
    </div>
</div>
</template>
