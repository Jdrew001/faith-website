export class DateUtils {
    private currentMonth;
    private currentYear;
    private dt;


    getCurrentdate() {
        this.dt = new Date();
        this.currentMonth = this.dt.getMonth();
        this.currentYear = this.dt.getFullYear();
        return { month: this.currentMonth, year: this.currentYear };
    }

    setCurrentDate() {
        this.dt = new Date();
        this.currentMonth = this.dt.getMonth();
        this.currentYear = this.dt.getFullYear();
    }

    getFuture() {
    if (this.currentMonth === 11) { //december
        // increase year and set current month to zero
        this.currentMonth = 0;
        this.currentYear += 1;
    } else {
        this.currentMonth += 1;
    }
    
        return { month: this.currentMonth, year: this.currentYear};
    }
    
    getPast() {
        if (this.currentMonth === 0) { // january
          this.currentMonth = 11;
          this.currentYear -= 1;
        } else {
          this.currentMonth -= 1;
        }
    
        return { month: this.currentMonth, year: this.currentYear };
    }
}