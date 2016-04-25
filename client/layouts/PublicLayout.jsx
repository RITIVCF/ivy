import React from 'react';

export const PublicLayout = ({content}) => (
	<div className="public-layout">
        <header>
					<a href="/"><h2>RIT IVCF</h2></a>
            <nav>
                <a href="/about">About</a>
                <a href="/ourchapter">Our Chapter</a>
								<a href="/smallgroup">Small Groups</a>
								<a href="/largegroup">Large Group</a>
								<a href="/prayer">Prayer</a>
								<a href="/localchurches">Local Churches</a>
								<a href="#cta">Questions</a>
            </nav>
        </header>
        <main>
		    {content}
        </main>
				<section id="cta">
					<h1>This is the CTA area</h1>
				</section>
				<footer>
					<h1>This is the footer area</h1>
					<a href="/ivy"><button>Ivy</button></a>
				</footer>
	</div>
)
