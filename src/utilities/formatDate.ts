export const formatDate = (dateString: string, format: string) => {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();

      const formatString = format
      .replace('DD', day.toString().padStart(2, '0'))
      .replace('MM', month.toString().padStart(2, '0'))
      .replace('YYYY', year.toString())
      .replace('hh', hours.toString().padStart(2, '0'))
      .replace('mm', minutes.toString().padStart(2, '0'))
      .replace('ss', seconds.toString().padStart(2, '0'));

      return formatString;
      };
