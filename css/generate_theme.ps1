$Files = .{
    Get-ChildItem -Path . -File
    Get-ChildItem -Recurse -Path ./components -File
}
$Files | Where-Object -FilterScript { $_.FullName.EndsWith('.css') -or $_.FullName.EndsWith('.scss') } | 
Select-Object -Property FullName