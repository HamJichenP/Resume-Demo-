<template>
  <div class="resume-block work-experience">
    <h2 class="work-section-title">Work Experience</h2>

    <div class="timeline">

      <div class="timeline-item">
        <div class="timeline-marker">
          <div class="timeline-dot"></div>
        </div>
        <div class="timeline-content">
          <div class="timeline-date-inline">2018-09 - 2021-10</div>
          <div class="job-header">
            <h3 class="job-title">Product Designer</h3>
            <p class="job-company">DesignStudio</p>
          </div>
          <ul class="job-responsibilities">
            <li class="exp-item">
              <span
                >Designed mobile and web applications for various clients across industries</span
              >
            </li>
          </ul>
        </div>
      </div>

      <div class="timeline-item">
        <div class="timeline-marker">
          <div class="timeline-dot"></div>
        </div>
        <div class="timeline-content">
          <div class="timeline-date-inline">2021-10 - Ongoing</div>
          <div class="job-header">
            <h3 class="job-title">Senior Product Designer</h3>
            <p class="job-company">TechCorp Inc.</p>
          </div>
          <ul class="job-responsibilities">
            <li class="exp-item">
              <span>Lead design initiatives for flagship SaaS platform serving 100K+ users</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<style>
.resume-block.work-experience {
  background: linear-gradient(to right, #FFF9F0, #FFEFD5);
  border: 2px solid #FDBA74;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 3px 10px rgba(245, 158, 11, 0.25);
}

.work-section-title {
  color: #EA580C;
}

.timeline {
  margin: 0 auto;
  max-width: 800px;
  position: relative;
  width: 100%;
  padding: 0; /* no left padding – center line now uses 50% */
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 10px;
  transform: translateX(-50%);
  background: #F59E0B;
}

.timeline-item {
  position: relative;
  width: 100%;
  margin: 10px 0;
  /* make sure children can sit on left or right sides */
}

.timeline-item:last-child {
  margin-bottom: 0;
}

/* Marker is always centered on the vertical line */
.timeline-marker {
  position: absolute;
  left: 50%;
  top: 0; /* align with the start of the block */
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  z-index: 2;
}

.timeline-dot {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: #FB923C;
  box-shadow: 0 0 0 3px #F59E0B;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.timeline-dot::after {
  content: '';
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background: #FFFFFF;
}

.timeline-date-inline {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

/* The content panel takes half of the width minus some spacing from the center line */
.timeline-content {
  width: calc(50% - 3.5rem); /* 3.5rem ≈ dot radius + breathing space */
}

/* Odd(奇數) items go on the left */
.timeline-item:nth-child(odd) .timeline-content {
  margin-right: auto;
  text-align: right; /* optional: right-align text to mirror the side */
}

/* Even(偶數) items go on the right */
.timeline-item:nth-child(even) .timeline-content {
  margin-left: auto;
  text-align: left;
}

/* only for right(Even) job-responsibilities settings */
.timeline-item:nth-child(even) .job-responsibilities {
  list-style-position: inside; /* dots are closer the text */
  padding-left: 0;
  margin-left: 0;
}

.timeline-item:nth-child(even) .job-responsibilities li {
  text-indent: -5px; /* 讓文字更靠近圓點 */
  padding-left: 0.5rem; /* 微量間距避免重疊 */
}

.experience-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* .job-header {
  margin-bottom: 0.75rem;
} */

.job-title {
  color: #EA580C;
  margin: 5px 0;
}

.job-company {
  color: #F97316;
  margin: 5px 0;
}

.job-responsibilities {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 10px 0;
  color: #3F3F46;
}
</style>
