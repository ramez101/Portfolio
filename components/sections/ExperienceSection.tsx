import SectionLabel from '@/components/ui/SectionLabel'
import { experiences } from '@/lib/data'

export default function ExperienceSection() {
  return (
    <section id="experience" className="page-section px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div data-reveal>
          <SectionLabel text="// work_experience" />
          <h2 className="section-title mb-4">
            Parcours professionnel
          </h2>
          <p className="mb-10 max-w-xl text-[var(--slate)] sm:mb-14">
            Des environnements exigeants qui ont forgé des réflexes solides.
          </p>
        </div>

        <div className="experience-code-list">
          {experiences.map((exp, i) => (
            <article key={exp.title} className="experience-code" data-reveal>
              <div className="experience-code__toolbar">
                <div className="experience-code__lights" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="experience-code__filename">experience_{String(i + 1).padStart(2, '0')}.ts</span>
                <span className="experience-code__language">TypeScript</span>
              </div>

              <div className="experience-code__body">
                <div className="experience-code__line">
                  <span className="experience-code__number" aria-hidden="true">01</span>
                  <p className="experience-code__comment">// {exp.period}</p>
                </div>
                <div className="experience-code__line">
                  <span className="experience-code__number" aria-hidden="true">02</span>
                  <h3 className="experience-code__title">
                    <span className="experience-code__keyword">const</span>{' '}
                    <span className="experience-code__variable">role</span>
                    <span className="experience-code__operator"> = </span>
                    <span className="experience-code__string">&quot;{exp.title}&quot;</span>
                    <span className="experience-code__punctuation">;</span>
                  </h3>
                </div>
                <div className="experience-code__line">
                  <span className="experience-code__number" aria-hidden="true">03</span>
                  <p className="experience-code__meta">
                    <span className="experience-code__variable">company</span>
                    <span className="experience-code__operator">: </span>
                    <span className="experience-code__string">&quot;{exp.company}&quot;</span>
                    <span className="experience-code__punctuation">, </span>
                    <span className="experience-code__variable">location</span>
                    <span className="experience-code__operator">: </span>
                    <span className="experience-code__string">&quot;{exp.location}&quot;</span>
                  </p>
                </div>
                <div className="experience-code__line experience-code__line--section">
                  <span className="experience-code__number" aria-hidden="true">04</span>
                  <p className="experience-code__array">
                    <span className="experience-code__variable">highlights</span>
                    <span className="experience-code__operator">: </span>
                    <span className="experience-code__bracket">[</span>
                  </p>
                </div>
                <ul className="experience-code__highlights">
                  {exp.bullets.map((bullet, j) => (
                    <li key={bullet} className="experience-code__line">
                      <span className="experience-code__number" aria-hidden="true">{String(j + 5).padStart(2, '0')}</span>
                      <span className="experience-code__bullet" aria-hidden="true">›</span>
                      <span className="experience-code__string">&quot;{bullet}&quot;</span>
                      {j < exp.bullets.length - 1 && <span className="experience-code__punctuation">,</span>}
                    </li>
                  ))}
                </ul>
                <div className="experience-code__line experience-code__line--closing">
                  <span className="experience-code__number" aria-hidden="true">{String(exp.bullets.length + 5).padStart(2, '0')}</span>
                  <span className="experience-code__bracket">];</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
