import React from 'react';

export const MainLayout = ({content}) => (
	<div className="main-layout">
				<header id="header">
					<a href="/ivy"><h1>Ivy</h1></a>
            <nav id="nav">
							<ul>
                <li class="current"><a href="/forms/contact">Select Contact Form</a></li>
                <li class="current"><a href="/ivy/ethnicity">Add Ethnicity</a></li>
								<li class="current"><a href="/ivy/events">Event Summary</a></li>
							</ul>
            </nav>
        </header>
        <main>
		    {content}
        </main>
				<footer>
					<a href="/"><button>Return to ivcf.rit.edu</button></a>
				</footer>
	</div>
)
