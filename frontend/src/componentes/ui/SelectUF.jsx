const UFs = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

export default function SelectUF({ label="UF", id, value, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      <select id={id} value={value} onChange={onChange} className="input">
        <option value="">Selecione</option>
        {UFs.map(u => <option key={u} value={u}>{u}</option>)}
      </select>
    </div>
  );
}
