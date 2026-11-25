import './AboutUs.css';

export function renderAboutUs(): string {
  return `
    <main class="about-us">
      <section class="about-us__hero">
        <p class="about-us__eyebrow">ANIME & KAWAII GOODS</p>

        <h1>A little joy in every package</h1>

        <p class="about-us__description">
          Welcome to MochiMood — your cozy corner for anime
          collectibles, cute accessories and lovely surprises.
          Discover your favorite characters and bring a little
          happiness into your everyday life.
        </p>

        <a class="about-us__button" href="#catalog">
          Explore catalog
        </a>
      </section>

      <section class="about-us__features">
        <h2>Why MochiMood?</h2>

        <div class="about-us__features-grid">
          <article class="about-us__feature">
            <h3>Lovely collectibles</h3>
            <p>
              Discover anime-inspired items and cute accessories
              for your collection.
            </p>
          </article>

          <article class="about-us__feature">
            <h3>Made for fans</h3>
            <p>
              Find merchandise inspired by the characters and
              stories you love.
            </p>
          </article>

          <article class="about-us__feature">
            <h3>A little happiness</h3>
            <p>
              Every item is an opportunity to make your day
              a little brighter.
            </p>
          </article>
        </div>
      </section>

      <section class="about-us__team">
        <h2>Meet our team</h2>

        <div class="about-us__team-grid">
          <article class="about-us__member">
            <h3>vanmikkk</h3>
            <p>UI/UX, design, navigation and catalog</p>
          </article>

          <article class="about-us__member">
            <h3>shereoshek</h3>
            <p>Product Details and shopping cart</p>
          </article>
        </div>
      </section>
    </main>
  `;
}
