using System;
using HopeMedicineSchedule.Enums;

namespace HopeMedicineSchedule.Dtos
{
    public class MedicineSheduleDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Dosage { get; set; }
        public DateTime StartDate { get; set; }
        public int RecurringHours { get; set; }
        public MedicineFrequency MedicineFrequency { get; set; }
        public int Times { get; set; }
    }
}