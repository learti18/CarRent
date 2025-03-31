
using CarRent.Server.Interfaces;

namespace CarRent.Server.Services.BackgroundTasks
{
    public class RentalStatusUpdater : IHostedService, IDisposable
    {
        private readonly IServiceScopeFactory _scopeFactory;
        private Timer _timer;

        public RentalStatusUpdater(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _timer = new Timer(async _ => await UpdateRentalStatusesAsync(), null, TimeSpan.Zero, TimeSpan.FromMinutes(30)); // Runs every 30 minutes
            return Task.CompletedTask;
        }

        private async Task UpdateRentalStatusesAsync()
        {
            using (var scope = _scopeFactory.CreateScope())
            {
                var rentalRepository = scope.ServiceProvider.GetRequiredService<IRentalRepository>();
                await rentalRepository.UpdateRentalStatusesAsync();
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _timer?.Change(Timeout.Infinite, 0);
            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}
