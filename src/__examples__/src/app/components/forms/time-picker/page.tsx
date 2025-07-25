import DateTimePickerExample from "../../../../components/forms/DateTimePickerExample";
import TimePickerExample from "../../../../components/forms/TimePickerExample";

export default function TimePickerPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">DateTimePicker Component</h1>
      <TimePickerExample />

      <DateTimePickerExample />
    </div>
  );
}
