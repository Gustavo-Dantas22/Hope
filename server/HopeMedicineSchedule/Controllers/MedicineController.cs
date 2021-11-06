﻿using System;
using Hangfire;
using HopeMedicineSchedule.Dtos;
using HopeMedicineSchedule.Enums;
using HopeMedicineSchedule.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HopeMedicineSchedule.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MedicineController : ControllerBase
    {
        private readonly IEmailSender _authSender;
        
        public MedicineController(IEmailSender authSender)
        {
            _authSender = authSender;
        }
        
        [HttpPost]
        public ActionResult Schedule(MedicineSheduleDto medicineSheduleDto)
        {
            switch (medicineSheduleDto.MedicineFrequency)
            {
                case MedicineFrequency.Daily:
                    DailyFrequency(medicineSheduleDto);
                    break;

                case MedicineFrequency.Weekly:
                    break;

                case MedicineFrequency.Monthly:
                    break;
            }

            return Ok();
        }

        private void DailyFrequency(MedicineSheduleDto medicineSheduleDto)
        {
            var dateTimeStart = medicineSheduleDto.StartDate;

            for (var i = 0; i < medicineSheduleDto.Times; i++)
            {
                if (i == 0)
                {
                    var recurringJobId = $"{medicineSheduleDto.Name} - {Guid.NewGuid()}";
                    RecurringJob.AddOrUpdate(recurringJobId,
                        () =>
                            _authSender.SendEmailAsync(medicineSheduleDto.Email, medicineSheduleDto.Name, dateTimeStart),
                        Cron.Daily(dateTimeStart.Hour, dateTimeStart.Minute),
                        TimeZoneInfo.Local);
                    
                    BackgroundJob.Enqueue(() => _authSender.SendEmailAsync(medicineSheduleDto.Email, medicineSheduleDto.Name, dateTimeStart));
                }
                else
                {
                    var recurringJobId = $"{medicineSheduleDto.Name} - {Guid.NewGuid()}";
                    RecurringJob.AddOrUpdate(recurringJobId,
                        () => _authSender.SendEmailAsync(medicineSheduleDto.Email, medicineSheduleDto.Name,
                            dateTimeStart), Cron.Daily(dateTimeStart.Hour, dateTimeStart.Minute), TimeZoneInfo.Local);
                }

                dateTimeStart = dateTimeStart.AddHours(medicineSheduleDto.RecurringHours);
            }
        }

        private void WeeklyFrequency(MedicineSheduleDto medicineSheduleDto)
        {
        }

        private void MonthlyFrequency(MedicineSheduleDto medicineSheduleDto)
        {
        }
    }
}