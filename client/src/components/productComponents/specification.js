import { Table } from "react-bootstrap";

const data = JSON.parse(
  '[{"name":"Color","value":"BLACK"},{"name":"RAM","value":"8 GB"},{"name":"Disque Dur","value":"512 GB"}]'
);
const Specification = () => {
  return (
    <Table responsive>
      <tbody>
        {data.map((item, key) => {
          return (
            <tr>
              <td key={key + item.name}>{item.name}</td>
              <td key={key + item.value}>{item.value}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default Specification;
