using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using HopeMedicineSchedule.Services.Interfaces;

namespace HopeMedicineSchedule.Services
{
    public class AuthSender: IEmailSender
    {
        public async Task SendEmailAsync(string email, string medicineName, DateTime date)
        {
            await Execute(email, medicineName, date);
        }
        
        private async Task Execute(string email, string medicineName, DateTime date)
        {
            MailMessage mail = new MailMessage()
            {
                From = new MailAddress("HopeNoReply@gmail.com", "Hope")
            };

            mail.To.Add(new MailAddress(email));

            mail.Subject = $"Remédio {medicineName} deve ser tomado às {date.ToLocalTime()}";
            mail.Body = "<h2>Lembrete de tomar remédio</h2>";
            mail.IsBodyHtml = true;
            mail.Priority = MailPriority.High;

            using (SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587))
            {
                smtp.Credentials = new NetworkCredential("HopeNoReply@gmail.com", "Hopeful123");
                smtp.EnableSsl = true;
                await smtp.SendMailAsync(mail);
            }
        }
    }
}