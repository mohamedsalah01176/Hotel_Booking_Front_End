import { DateRange ,type RangeKeyDict, type Range } from "react-date-range";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { enUS } from "date-fns/locale"; 
import { ar } from "date-fns/locale";

interface IProps {
  range: Range[];
  setRange: (val: Range[]) => void;
  isMobile: boolean;
  setOpen: (val: boolean) => void;
  disableDates:Date[]
}
const DateTable = ({range,setRange,isMobile,setOpen,disableDates}:IProps) => {
  const {i18n}=useTranslation();
  console.log(disableDates)
  return (
    <div className={`border rounded-xl p-4 shadow-lg bg-white z-50 absolute top-16 -right-7 ${i18n.language==="en"?"md:right-0":"md:-right-[420px]"} `}>
      <p className="text-sm font-medium mb-2">
        {format(range[0].startDate!, "MMM dd, yyyy")} →{" "}
        {format(range[0].endDate!, "MMM dd, yyyy")}
      </p>

      <DateRange
        editableDateInputs={true}
        onChange={(item: RangeKeyDict) => setRange([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={range}
        rangeColors={["#000"]}
        minDate={new Date()}
        months={isMobile ? 1 : 2}
        direction={isMobile ? "vertical" : "horizontal"}
        disabledDates={disableDates}
        locale={i18n.language === "ar" ? ar : enUS}
      />

      <div className="flex justify-between mt-4">
        <button
          className="text-sm text-red-500 underline"
          onClick={() =>
            setRange([
              {
                startDate: new Date(),
                endDate: new Date(),
                key: "selection",
              },
            ])
          }
        >
          Clear dates
        </button>
        <button
          onClick={() => setOpen(false)}
          className="bg-black text-white px-4 py-2 rounded-md text-sm"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default DateTable