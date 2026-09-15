### Step 1: Create the Solution and WPF Project

1.  Open **Visual Studio 2022**.
    
2.  On the start window, click **"Create a new project"** (or go to File > New > Project...).
    
3.  In the template search box, type **WPF Application** (make sure it shows **C#**, **Windows**, **Desktop**). Click **Next**.
    
4.  Configure your new project:
    
    *   **Project name:** CKYC.DataGenerator
        
    *   **Location:** Browse to your root folder, for example: C:\\Users\\bhutd\\Desktop\\utility\\src
        
    *   **Solution name:** CKYC.DataGenerator
        
    *   **Solution directory:** Put the solution in C:\\Users\\bhutd\\Desktop\\utility (uncheck _"Place solution and project in the same directory"_ so that the project lives in src\\CKYC.DataGenerator).
        
    *   Click **Next**.
        
5.  In the **Additional information** screen:
    
    *   **Framework:** Select **.NET 8.0 (Long Term Support)**.
        
    *   Click **Create**.
        

### Step 2: Install NuGet Package (ClosedXML) via UI

1.  In the **Solution Explorer** panel on the right, right-click the **CKYC.DataGenerator** project.
    
2.  Click **Manage NuGet Packages...**
    
3.  Click the **Browse** tab at the top.
    
4.  textClosedXML
    
5.  Click on **ClosedXML** in the search list.
    
6.  In the right pane:
    
    *   Select version: **0.105.1** (or latest).
        
    *   Click the **Install** button.
        
7.  If a preview or license dialog appears, click **OK / I Accept**.
    

### Step 3: Create the Project Folders in Solution Explorer

In **Solution Explorer**, right-click **CKYC.DataGenerator** > **Add** > **New Folder**:

*   Create folder: Engine
    
    *   Right-click Engine > **Add** > **New Folder**: Exporters
        
*   Create folder: Models
    
*   Create folder: Schemas
    

### Step 4: Add the External config Folder & JSON Files

1.  Open Windows File Explorer, go to your project root utility\\, and create a folder named config.
    
2.  Place your JSON files (enums.json, templates.json, conditions.json, country.json) inside utility\\config\\.
    
3.  xml config\\%(Filename)%(Extension) PreserveNewest PreserveNewest
    
    *   Double-click the **CKYC.DataGenerator** project in Solution Explorer to open its XML .csproj editor.
        
    *   Add this item group to link and auto-copy config files on build:
        
    
    *   Press **Ctrl + S** to save.
        

### Step 5: Configure Single-File Publish Profile in Visual Studio UI

To configure the standalone single .exe generator using the UI:

1.  Right-click the **CKYC.DataGenerator** project > click **Publish...**
    
2.  In the wizard:
    
    *   **Target:** Select **Folder** > click **Next**.
        
    *   **Specific Target:** Select **Folder** > click **Next**.
        
    *   **Folder Location:** Enter publish\\win-x64 > click **Finish**.
        
3.  In the Publish summary screen:
    
    *   Click the **Edit (pencil icon)** next to _Target Location / Settings_ (or click **More options** > **Edit**).
        
    *   Set the following profile options:
        
        *   **Configuration:** Release | Any CPU
            
        *   **Deployment Mode:** Self-contained
            
        *   **Target Runtime:** win-x64
            
        *   Expand **File publish options**:
            
            *   Check: ☑ **Produce single file**
                
            *   Check: ☑ **Enable compression in single file**
                
    *   Click **Save**.
        
4.  Whenever you want to create your standalone executable, simply click the **Publish** button at the top right of this screen.
    

Step 1: Prerequisites & Environment Setup

1.  **Operating System:** Windows 10 or 11 (required for WPF desktop apps).
    
2.  powershelldotnet --version
    
3.  **IDE / Editor:**
    
    *   **Visual Studio 2022** (Community/Professional) with the **".NET Desktop Development"** workload checked, OR
        
    *   **VS Code** with the **C# Dev Kit** extension.
        

### Step 2: Initialize Solution and Project from Scratch

In your desired directory (e.g., terminal/powershell):

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   powershell# 1. Create a root directorymkdir utilitycd utility# 2. Create the solution filedotnet new sln -n CKYC.DataGenerator# 3. Create the WPF project in src/CKYC.DataGeneratordotnet new wpf -n CKYC.DataGenerator -o src/CKYC.DataGenerator --framework net8.0-windows# 4. Add the project to the solutiondotnet sln add src/CKYC.DataGenerator/CKYC.DataGenerator.csproj# 5. Add required NuGet packages (ClosedXML for Excel generation)dotnet add src/CKYC.DataGenerator/CKYC.DataGenerator.csproj package ClosedXML --version 0.105.1   `

### Step 3: Configure Project File (CKYC.DataGenerator.csproj)

Update your src/CKYC.DataGenerator/CKYC.DataGenerator.csproj to support single-file publishing and config file linking:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`xml      WinExe    net8.0-windows    enable    enable    true          true    true    win-x64    true    true    None    false        config\%(Filename)%(Extension)      PreserveNewest      PreserveNewest`      

### Step 4: Directory Structure Setup

Create the folder hierarchy:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   textutility/├── config/                     <- External JSON rules & enums│   ├── enums.json              <- Dynamic enum values (code, name, type)│   ├── templates.json          <- Field definitions, formats, sequence patterns│   ├── conditions.json         <- Scenario rules (Minor, PEP, NRI, etc.)│   └── country.json            <- Country code mappings├── src/│   └── CKYC.DataGenerator/│       ├── Engine/│       │   ├── ConfigManager.cs          <- Loads JSON configs with embedded fallback│       │   ├── FastStreamingGenerator.cs <- High-throughput mock generator│       │   ├── SchemaManager.cs          <- Template & schema registry│       │   ├── ThemeManager.cs           <- Light/Dark UI theme toggle│       │   └── Exporters/│       │       ├── CsvPipeExporter.cs    <- Pipe/comma delimited streaming writer│       │       └── ExcelExporter.cs      <- ClosedXML XLSX exporter│       ├── Models/│       │   ├── ConfigModels.cs           <- DTOs for configs, rules, fields│       │   └── DataSchema.cs             <- DTOs for schema definitions│       ├── Schemas/│       │   └── CKYC_FL1_IND_Default.json <- CKYC Individual schema template│       ├── App.xaml / App.xaml.cs        <- Application entry point│       └── MainWindow.xaml / .xaml.cs    <- WPF UI presentation & state├── build.bat                   <- Quick build script└── build-dist.ps1              <- Packaging script for ZIP distribution   `

### Step 5: How to Run and Build

#### 1\. Running in Development:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   powershelldotnet run --project src/CKYC.DataGenerator/CKYC.DataGenerator.csproj   `

#### 2\. Building Standalone Release Executable:

You can run the existing build.bat or run:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   powershelldotnet publish src/CKYC.DataGenerator/CKYC.DataGenerator.csproj -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true -o publish/win-x64   `

The output will be an executable in publish\\win-x64\\CKYC.DataGenerator.exe.

#### 3\. Creating Full Distribution Package:

Run build-dist.ps1 in PowerShell:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   powershellpowershell -ExecutionPolicy Bypass -File .\build-dist.ps1   `

This packages the .exe, config/ directory, and README.txt into a clean zip file under dist/.

### What Else Changes You Have to Do (Customizations & Tuning)

Depending on your specific organization or project requirements, check these areas:

1.  **CKYC Specifications & Schemas:**
    
    *   **Legal Entities / Non-Individuals:** Currently, the default schema is for individuals (CKYC\_FL1\_IND\_Default.json). If you need Legal Entity (LE) or Related Party templates, add corresponding JSON schema files under Schemas/ and register them in DefaultSchemaFactory.cs.
        
    *   **FI / Institution Codes:** In config/templates.json, change default organization/institution identifiers to match your bank/FI prefix.
        
2.  **Validation & Test Scenarios:**
    
    *   Modify config/conditions.json to add custom validation scenarios (e.g., specific age thresholds, mandatory documents for high-risk profiles, or state-specific tax rules).
        
3.  **Application Identity & Branding:**
    
    *   Add an application icon icon.ico in CKYC.DataGenerator.csproj.
        
    *   Update metadata like AssemblyTitle, Version, and Company in AssemblyInfo.cs.
        
4.  **Self-Contained vs Framework-Dependent Distribution:**
    
    *   The current setup uses --self-contained true (~70-100MB .exe), which bundles the .NET runtime so target machines don't need any install.
        
    *   If your deployment target already has .NET 8 Desktop Runtime installed and you want a much smaller download (~2-3MB), change --self-contained to false in build.bat and CKYC.DataGenerator.csproj
