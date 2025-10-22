using Microsoft.Extensions.Options;
using Microsoft.Extensions.FileProviders;   // 提供對實體檔案系統的封裝
using System.IO;                            // 處理路徑、目錄等 I/O API

var builder = WebApplication.CreateBuilder(args);

//加入CORS功能
const string CorsPolicy = "AllowFrontend";
builder.Services.AddCors(options =>
{
    options.AddPolicy(CorsPolicy, policy => //註冊一個可以被啟用的「跨網域策略」
        policy.WithOrigins("http://localhost:5173") //只允許從 5173 來源發出的請求(前端)
            .AllowAnyHeader()                       //任何自訂 HTTP header
            .AllowAnyMethod()                       //允許前端使用所有 HTTP(CRUD) 方法呼叫 API
        );
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

//啟用CORS
app.UseCors(CorsPolicy);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var uploadsPath = Path.Combine(
    Directory.GetParent(app.Environment.ContentRootPath)!.FullName, // 回到 PortfolioProject 目錄
     "uploads"                                                      // 再進 uploads 子資料夾
);

if (Directory.Exists(uploadsPath)) //確保那個資料夾真的存在，才會繼續執行下面的靜態檔設定
{
    app.UseStaticFiles(new StaticFileOptions //外部能直接透過 URL 讀取某個資料夾裡的檔案
    {
        FileProvider = new PhysicalFileProvider(uploadsPath), // 告訴 ASP.NET 這個實體路徑是靜態檔來源
        RequestPath = "/uploads"                              // 對外用這個網址前綴來存取    
    });
}

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
