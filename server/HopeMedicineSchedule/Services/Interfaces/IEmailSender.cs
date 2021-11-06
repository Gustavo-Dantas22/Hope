using System;
using System.Threading.Tasks;

namespace HopeMedicineSchedule.Services.Interfaces
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string medicineName, DateTime date);
    }
}