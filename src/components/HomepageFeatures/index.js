import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'CrossFi Chain',
    Svg: require('@site/static/img/chain.svg').default,
    description: (
      <>
        CrossFi Chaim is the core of the Cross Finance ecosystem with <code>unlimited scalability.</code>
      </>
    ),
  },
  {
    title: 'CrossFi APP',
    Svg: require('@site/static/img/app.svg').default,
    description: (
      <>
        <code>Online Web 3 banking</code> combines fiat and cryptocurrency transactions.
      </>
    ),
  },
  {
    title: 'CrossFi xAPP',
    Svg: require('@site/static/img/xapp.svg').default,
    description: (
      <>
        A a <code>multi-purpose DeFi</code> application for the CrossFi ecosystem.
      </>
    ),
  },
  {
    title: 'CrossFi Business',
    Svg: require('@site/static/img/business.svg').default,
    description: (
      <>
        CrossFi business is a <code>payment system</code> that allows companies to accept crypto payments online and offline.
      </>
    ),
  },
  {
    title: 'CrossFi Foundation',
    Svg: require('@site/static/img/foundation.svg').default,
    description: (
      <>
        A <code>non-profit self-regulating organization</code>, whose main goal is the development and scaling of the Cross Finance ecosystem.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col-4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
