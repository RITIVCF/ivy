import React from 'react';
import AccountsUIWrapper from '../AccountsUIWrapper.jsx';

export const MainLayout = ({content}) => (
	<div className="main-layout">
				<header id="header">
					<a href="/">RIT IVCF</a>
            <nav id="nav">
							<ul>
								<li><AccountsUIWrapper /></li>
                <li class="current"><a href="/forms/contact">Select Contact Form</a></li>
                <li class="current"><a href="/ethnicity">Add Ethnicity</a></li>
								<li class="current"><a href="/events">Event Summary</a></li>
								<li class="current"><a href="/calendar">Event Calendar</a></li>
							</ul>
            </nav>
        </header>
        <main>
		    {content}
        </main>
				<footer>
				</footer>
	</div>
)
