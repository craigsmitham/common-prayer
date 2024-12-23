const previewDates = [
  '2024-12-24', // Advent
  '2024-12-25', // Christmas
  '2025-01-06', // Epiphany
  '2025-03-05', // Lent
  '2025-04-20', // Easter
  '2025-06-15', // Trinity Season
];

export default function Design() {
  return (
    <div className="flex flex-col min-h-dvh">
      <div className={'flex'}>
        <div>Options</div>
        <div>Dark/Light</div>
        <div>Observed/Unobserved</div>
      </div>
      <div
        className={
          'flex-1 grid  grid-rows-2 grid-cols-3 gap-4 h-full p-4 bg-gray-300'
        }
      >
        {previewDates.map((date) => (
          <div key={date} className={'bg-white'}>
            <iframe
              className={'w-full h-full'}
              src={`/?today=${date}`}
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}
