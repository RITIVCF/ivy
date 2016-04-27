import React from 'react';

export const PublicLayout = ({content}) => (
	<div className="public-layout">
        <header id="header">
					<a href="/"><h1 id="logo">RIT IVCF</h1></a>
            <nav id="nav">
							<ul>
                <li class="current"><a href="/about">About</a></li>
                <li class="current"><a href="/ourchapter">Our Chapter</a></li>
								<li class="submenu">
									<ul>
										<li class="current"><a href="/smallgroup">Small Groups</a></li>
										<li class="current"><a href="/largegroup">Large Group</a></li>
										<li class="current"><a href="/prayer">Prayer</a></li>
										<li class="current"><a href="/localchurches">Local Churches</a></li>
									</ul>
								</li>
								<li class="button special"><a href="#cta">Questions</a></li>
								<li class="button special"><a href="/forms/member">Become a Member</a></li>
							</ul>
            </nav>
        </header>
        <main>
		    {content}
        </main>
				<section id="cta">
					<header>
        		<h2>Would you like more <strong>Information</strong>?</h2>
        		<p>Email us any questions    | |   Join our mailing list   | |    Fill out our Learn More form</p>
    			</header>
			    <footer>
			        <ul class="buttons">
			            <li><a href="contact.php" class="button"><i class="fa fa-envelope-o"></i> ivcf at rit.edu</a></li>
									<li><a href="ivy/getinvolved.php" class="button"><i class="fa fa-book"></i> Learn More</a></li>
			        </ul>
			    </footer>
				</section>
				<footer>
					<ul class="icons">
        		<li><a href="https://twitter.com/ritivcf" class="icon fa-twitter" target="_blank"><span class="label">Twitter</span></a></li>
        		<li><a href="https://www.facebook.com/ritivcf" class="icon fa-facebook-official" target="_blank"><span class="label">Facebook</span></a></li>
						<li><a href="https://instagram.com/ritivcf" class="icon fa-instagram" target="_blank"><span class="label">Instagram</span></a></li>
    			</ul>
					<span class="copyright">Made with Love, Intervarsity Christian Fellowship at RIT</span>
					<a href="/ivy"><button>Ivy</button></a>
				</footer>
	</div>
)
