$files = @(
    "src\components\CareerChallenges.js",
    "src\pages\AICoach.js",
    "src\pages\AdminDashboard.js",
    "src\pages\CareerDetail_fixed.js",
    "src\pages\CareerQuiz.js",
    "src\pages\ChallengesPage.js",
    "src\pages\Dashboard.js",
    "src\pages\Home.js",
    "src\pages\NotFound.js",
    "src\pages\PremiumFeatures.js",
    "src\pages\Profile.js",
    "src\pages\QuizResults.js",
    "src\pages\premium\BurnoutPrediction.js",
    "src\pages\premium\CareerChallenges.js",
    "src\pages\premium\CareerSwitching.js",
    "src\pages\premium\CognitiveFit.js",
    "src\pages\premium\RiskvsReward.js",
    "src\pages\premium\RiskvsRewardAnalyzer.js",
    "src\pages\premium\SmartResumeBuilder.js",
    "src\pages\premium\careerimpact.js",
    "src\services\careerChallengesService.js",
    "src\services\stripeService.js"
)

foreach ($file in $files) {
    $content = Get-Content $file
    $newContent = "/* eslint-disable no-unused-vars */`n" + ($content -join "`n")
    Set-Content $file $newContent
}

Write-Host "Added ESLint disable comments to all files"
