import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class AboutWrapper extends TrackerReact(React.Component){
  render(){
    return (
      <div>
        <h1>About IVCF</h1>
        <h2>Our Vision</h2>
        <ul>
          <li>Students and Faculty Transformed</li>
          <li>Campuses Renewed</li>
          <li>World Changers Developed</li>
        </ul>
        <h2>Our Mission</h2>
        <p>In response to God's love, grace, and truth: The Purpose of
          InterVarsity Christian Fellowship/USA is to establish and
          advance at colleges and universities witnessing communities of
          students and faculty who follow Jesus as Savior and Lord: growing
          in love for God, God's Word, God's people of every ethnicity and
          culture and God's purposes in the world.</p>
        <h2>Our History</h2>
        <p>The roots of our movement are with students at the University
          of Cambridge, England in 1877. There, a group of Christian
          students began to meet together, in spite of the disapproval
          of some University officials, to pray, to study the Bible and
          to witness to fellow students. Soon, similar groups sprang up
          on other campuses. Eventually, they formed the British Inter-Varsity.
          (Hence our name, inter – meaning between, varsity – the British
            term for college level students.) From the very beginning they
             had a strong concern to take the gospel to those all over the
             world who had never heard it – a concern that continues in
             InterVarsity today. Evangelism and discipleship are hallmarks
             of InterVarsity's campus ministry. <br/>Click below to learn more
             about InterVarsity:<br/>
           <a href="https://intervarsity.org/about/our/ministry-overview" target="_blank">
             <button>IV National</button>
           </a></p>
      </div>
    )
  }
}
