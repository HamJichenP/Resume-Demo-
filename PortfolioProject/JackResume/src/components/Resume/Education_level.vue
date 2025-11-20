<template>
  <section class="edu-section">
    <h2 class="edu-title">Education</h2>

    <div class="edu-grid">
      <div class="edu-item">
        <div class="edu-icon-wrapper">
          <div class="edu-icon">
            <span class="material-symbols-outlined icon-symbol">school</span>
          </div>
        </div>
        <div>
          <h3 class="edu-degree">M.S. in Human-Computer Interaction</h3>
          <p class="edu-school">University of Design</p>
          <p class="edu-year">2015 - 2017</p>
        </div>
      </div>

      <div class="edu-item">
        <div class="edu-icon-wrapper">
          <div class="edu-icon">
            <span class="material-symbols-outlined icon-symbol">school</span>
          </div>
        </div>
        <div>
          <h3 class="edu-degree">B.S. in Graphic Design</h3>
          <p class="edu-school">State College</p>
          <p class="edu-year">2011 - 2015</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
/* Section wrapper */
.edu-section {
  background-color: var(--card-light);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

@media (min-width: 640px) {
  .edu-section {
    padding: 32px;
  }
}

/* Dark mode */
.dark .edu-section {
  background-color: var(--card-dark);
}

/* Title */
.edu-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--heading-light);
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-light);
}

.dark .edu-title {
  color: var(--heading-dark);
  border-color: var(--border-dark);
}

/* Grid */
.edu-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
}

@media (min-width: 768px) {
  .edu-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Item layout */
.edu-item {
  display: flex;
  gap: 16px;
}

/* Icon area */
.edu-icon-wrapper {
  flex-shrink: 0;
}

.edu-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background-color: rgba(var(--primary-rgb), 0.1);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.dark .edu-icon {
  background-color: rgba(var(--primary-rgb), 0.2);
}

/* Icon size */
.icon-symbol {
  font-size: 1.875rem !important; /* text-3xl */
}

/* Degree title */
.edu-degree {
  font-size: 1.125rem; /* text-lg */
  font-weight: 600;
  color: var(--heading-light);
}

.dark .edu-degree {
  color: var(--heading-dark);
}

/* School */
.edu-school {
  font-size: 1rem;
  color: var(--primary);
  font-weight: 500;
}

/* Year text */
.edu-year {
  font-size: 0.875rem;
  margin-top: 4px;
  color: var(--text-light);
}

.dark .edu-year {
  color: var(--text-dark);
}
</style>
