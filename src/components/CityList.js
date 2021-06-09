import City from './City.js';

export default function CityList(props) {
  const cities = props.cities.length ? (
    props.cities.map((city) => {
      return (
        <City key={city.id}
              city={city}
              className="mt-4"
              cityRemove={props.cityRemove} />
      );
    })
  ) : (
    <li className="my-4">
      You have not added any locations.
    </li>
  );

  return (
    <div className="has-text-centered">
      <ul className="my-4 py-2">
        {cities}
      </ul>
    </div>
  );
}
