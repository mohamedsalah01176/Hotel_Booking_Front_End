
export const GenerateDatesRange = (range:{startDate:Date,endDate:Date}[]) => {
  
  const allDates:Date[]=[];

  range.forEach((item)=>{
    const current =new Date(item.startDate);
    const last= new Date(item.endDate);

    while(current <= last){
      allDates.push(new Date(current));
      current.setDate(current.getDate()+1)
    }
  });

  return allDates
}

