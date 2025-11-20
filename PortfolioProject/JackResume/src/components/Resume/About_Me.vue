<template>
<div class="resume-block about-me-block">
          <h2 class="section-title">About Me</h2>
          <p class="about-paragraph">
            I'm a passionate product designer with over 8 years of experience creating user-centered digital experiences.
            My work focuses on bridging the gap between user needs and business goals through thoughtful design solutions.
            I believe in the power of collaboration, accessibility, and continuous learning to create products that truly make a difference.
          </p>
          <ul class="bullet-list">
            <li class="bullet-item">
              <span>Specialized in design systems, user research, and cross-functional collaboration</span>
            </li>
            <li class="bullet-item">
              <span>Strong advocate for accessibility and inclusive design practices</span>
            </li>
            <li class="bullet-item">
              <span>Experienced in leading design teams and mentoring junior designers</span>
            </li>
          </ul>
        </div>
</template>

<style>
.about-me-block {
  background: linear-gradient(135deg, #FFF9F5 0%, #FDE68A 100%);
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(245, 158, 11, 0.2), 0 2px 4px -1px rgba(245, 158, 11, 0.1);
  padding: 2rem;
  border: 2px solid #F59E0B;
}

.section-title {
  color: #F59E0B;
  margin: 0;
  margin-left: 39px;
  font-size: 40px;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(251, 113, 133, 0.1);
}

.about-paragraph {
  text-indent: 2em; /* The width of the first two characters is indented. */
  margin-left: 39px;
  color: #374151;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  font-size: 1.0625rem;
}

.bullet-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #374151;
}

.bullet-item {
  display: flex;
  gap: 1rem;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 1rem;
  border-radius: 0.5rem;
  border-left: 4px solid #FB7185;
  backdrop-filter: blur(10px);
  transition: transform 0.2s ease, background-color 0.2s ease, border-left-color 0.2s ease;
  box-shadow: 0 2px 4px rgba(245, 158, 11, 0.1);
}

.bullet-item:hover {
  transform: translateX(8px);
  background-color: rgba(255, 255, 255, 0.9);
  border-left-color: #F59E0B;
}

.bullet-point {
  color: #F59E0B;
  margin-top: 0.25rem;
  font-size: 1.25rem;
  font-weight: bold;
  position: absolute;
  left: -0.5rem;
}

.bullet-item span:not(.bullet-point) {
  margin-left: 0.75rem;
}

</style>