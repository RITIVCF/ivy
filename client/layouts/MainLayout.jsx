import React from 'react';

export const MainLayout = ({content}) => (
	<div className="main-layout">
        <header>
            <a href="/ivy"><h2>Ivy</h2></a>
            <nav>
							<a href="/forms/contact">Select Contact Form</a>
							<a href="/forms/ethnicity">Add Ethnicity</a>
							<a href="/forms/member">Member Form</a>
            </nav>
        </header>
        <main>
		    {content}
        </main>
	</div>
)
