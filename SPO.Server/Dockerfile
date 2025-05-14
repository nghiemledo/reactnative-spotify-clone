# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Install dotnet-ef tool
RUN dotnet tool install --global dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools"

# Copy csproj files for all projects
COPY SPO.Application/*.csproj ./SPO.Application/
COPY SPO.Common/*.csproj ./SPO.Common/
COPY SPO.Domain/*.csproj ./SPO.Domain/
COPY SPO.Infrastructure/*.csproj ./SPO.Infrastructure/
COPY SPO.Server/*.csproj ./SPO.Server/

# Restore dependencies
RUN dotnet restore ./SPO.Server/SPO.Server.csproj

# Copy all source code
COPY . .

# Publish
RUN dotnet publish ./SPO.Server/SPO.Server.csproj -c Release -o /app/publish /p:UseAppHost=false

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app

COPY --from=build  /app/publish .


ENV ASPNETCORE_URLS=http://+:81
ENV DOTNET_RUNNING_IN_CONTAINER=true
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=1

# Remove unnecessary files
RUN find /app -name "*.pdb" -delete && \
    find /app -name "*.xml" -delete

EXPOSE 80

ENTRYPOINT ["dotnet", "SPO.Server.dll"]