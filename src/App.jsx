import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/Admin/Dashboard";
import Subscription from "./pages/Admin/Subscription";
import DailyVersesPage from "./pages/Admin/DailyVerse/DailyVerse";
import AddDailyVerseWizard from "./pages/Admin/DailyVerse/AddDailyVerse";
import DailyReflectionList from "./pages/Admin/DailyReflection/DailyReflectionList";
import AddHistoricalStory from "./pages/Admin/DailyReflection/AddHistoricalStory";
import PrayWithMePage from "./pages/Admin/PrayWithMe/PrayWithMe";
import PrayWithMeSettingsPage from "./pages/Admin/PrayWithMe/PrayWithMeSetting";
import SoundAudio from "./pages/Admin/SoundAudio/SoundAudio";
import AIOverview from "./pages/Admin/AIEngagement/AIOverview";
import AIExperience from "./pages/Admin/AIEngagement/AIExperience";
import AICredits from "./pages/Admin/AIEngagement/AICredits";
import SeasonalJourneysPage from "./pages/Admin/SeasonalJourney/SeasonalJourney";
import AddSeasonalJourneyWizard from "./pages/Admin/SeasonalJourney/AddSeasonalJourney";
import EditDailyContentPage from "./pages/Admin/SeasonalJourney/EditDailyContent";
import TermsPrivacy from "./pages/Admin/TermsPrivacy/TermsPrivacy";
import EditLegalDocument from "./pages/Admin/TermsPrivacy/EditLegalDocument";
import HelpCenter from "./pages/Admin/HelpCenter/HelpCenter";
import SupportInbox from "./pages/Admin/SupportInbox/SupportInbox";
import Badges from "./pages/Admin/Badges/Badges";
import AddBadge from "./pages/Admin/Badges/AddBadge";
import TiersManagement from "./pages/Admin/Badges/TiersManagement";
import DonationsDashboardPage from "./pages/Admin/Gifts&Donations/DonationDashboard";
import DonationDetailsPage from "./pages/Admin/Gifts&Donations/DonationDetailsPage";
import RecordDonationPage from "./pages/Admin/Gifts&Donations/RecoardDonation";
import ChapterStoriesPage from "./pages/Admin/ChapterStories/ChapterStories";
import AddChapterStoryPage from "./pages/Admin/ChapterStories/AddChapterStories";
import JournalSettingsPage from "./pages/Admin/Journal/JournalSettings";
import SiteSettingsPage from "./pages/Admin/Settings/SiteSettings";
import NotificationsPage from "./pages/Admin/Notification/NotificationPage";
import CreateNotificationPage from "./pages/Admin/Notification/CreateNotificationPage";
import Activities from "./pages/Admin/Activities/Activities";
import AddQuizQuestions from "./pages/Admin/Activities/AddQuizQuestions";
import AIQuizGenerator from "./pages/Admin/Activities/AIQuizGenerator";
import AddQuestionManually from "./pages/Admin/Activities/AddQuestionManually";
import BulkUploadQuizQuestions from "./pages/Admin/Activities/BulkUploadQuizQuestions";
import AddWordSearch from "./pages/Admin/Activities/AddWordSearch";
import QuizManagement from "./pages/Admin/QuizManagement/QuizManagement";
import AIQuestionGenerator from "./pages/Admin/QuizManagement/AIQuizGenerator";
import ManagePlansPage from "./pages/Admin/WebsiteManagement/ManagePlansPage";
import WordSearchManagement from "./pages/Admin/WordSearch/WordSearchManagement";
import AddEditWordSearch from "./pages/Admin/WordSearch/AddEditWordSearch";
import AIGenerateWordSearch from "./pages/Admin/WordSearch/AIGenerateWordSearch";
import AIGenerateVerseRestoration from "./pages/Admin/WordSearch/AIGenerateVerseRestoration";
import AIGenerateAudioRevelation from "./pages/Admin/WordSearch/AIGenerateAudioRevelation";
import AIGenerateMysteryScripture from "./pages/Admin/WordSearch/AIGenerateMysteryScripture";
import ManualHiddenRestoration from "./pages/Admin/WordSearch/ManualHiddenRestoration";
import ManualVerseRestoration from "./pages/Admin/WordSearch/ManualVerseRestoration";
import ManualAudioRevelation from "./pages/Admin/WordSearch/ManualAudioRevelation";
import ManualMysteryScripture from "./pages/Admin/WordSearch/ManualMysteryScripture";
import CSVUploadWordSearch from "./pages/Admin/WordSearch/CSVUploadWordSearch";
import CSVUploadValidateMap from "./pages/Admin/WordSearch/CSVUploadValidateMap";
import CSVUploadReviewImages from "./pages/Admin/WordSearch/CSVUploadReviewImages";
import CSVUploadImportReview from "./pages/Admin/WordSearch/CSVUploadImportReview";
import AddChapterAudioStory from "./pages/Admin/Activities/AddChapterAudioStory";
import AddMemoryVerse from "./pages/Admin/Activities/AddMemoryVerse";
import CouponCodesPage from "./pages/Admin/CouponCodes/CouponCodePage";
import CreateCouponPage from "./pages/Admin/CouponCodes/CreateCouponCode";
import BroadSpectrumPage from "./pages/Admin/BroadSpectrum/BroadSpectrumPage";
import DivineCounselManagementPage from "./pages/Admin/DivineCounsel/DivineCounselPage";
import AddDivineCounselTopicPage from "./pages/Admin/DivineCounsel/AddDivineCounselPage";
import GroupPlaySettings from "./pages/Admin/GroupPlay/GroupPlaySettings";
import BibleBooksPage from "./pages/Admin/BibleBooks/BibleBookPage";
import EditBookPage from "./pages/Admin/BibleBooks/EditBibleBook";
import StreakMilestonesRewards from "./pages/Admin/Streaks/StreakMilestonesRewards";
import MemoryVerseManagement from "./pages/Admin/MemoryVerse/MemoryVerseManagement";
import AddEditMemoryVerse from "./pages/Admin/MemoryVerse/AddEditMemoryVerse";
import AddEditMemoryVerseAI from "./pages/Admin/MemoryVerse/AddEditMemoryVerseAI";
import CreateMysteryCard from "./pages/Admin/MysteryCard/CreateMysteryCard";
import MysteryCardDashboard from "./pages/Admin/MysteryCard/MysteryCardDashboard";
import EditMysteryCard from "./pages/Admin/MysteryCard/EditMysteryCard";
import UserManagementPage from "./pages/Admin/UserManagement/UserManagement";
import RolesPermissionsPage from "./pages/Admin/UserManagement/RolesPermissions";
import AddUserPage from "./pages/Admin/UserManagement/AddNewUser";
import StreakManagementPage from "./pages/Admin/Streaks/StreaksManagement";
import LevelsPage from "./pages/Admin/LevelManagement/LevelManagementPage";
import QuizQuestionFormPage from "./pages/Admin/AddQuizQuestions/QuizQuestionFormPage";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      <Route path="/admin" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="subscriptions" element={<Subscription />} />
        <Route path="dailyverse" element={<DailyVersesPage />} />
        <Route path="dailyverse/add" element={<AddDailyVerseWizard />} />

        <Route path="dailyreflection" element={<DailyReflectionList />} />
        <Route path="dailyreflection/add" element={<AddHistoricalStory />} />

        <Route path="pray-with-me" element={<PrayWithMePage />} />
        <Route path="pray-with-me/settings" element={<PrayWithMeSettingsPage />} />

        <Route path="sound-audio" element={<SoundAudio />} />
        <Route path="ai-engagement/overview" element={<AIOverview />} />
        <Route path="ai-engagement/experience" element={<AIExperience />} />
        <Route path="ai-engagement/credits" element={<AICredits />} />
        
        <Route path="seasonal-journey" element={<SeasonalJourneysPage />} />
        <Route path="seasonal-journey/add" element={<AddSeasonalJourneyWizard />} />
        <Route path="seasonal-journey/add/edit-daily-content" element={<EditDailyContentPage />} />

        <Route path="terms-privacy" element={<TermsPrivacy />} />
        <Route path="terms-privacy/edit" element={<EditLegalDocument />} />
        <Route path="help-center" element={<HelpCenter />} />
        <Route path="support-inbox" element={<SupportInbox />} />

        <Route path="badges" element={<Badges />} />
        <Route path="badges/add" element={<AddBadge />} />
        <Route path="tiers" element={<TiersManagement />} />

        <Route path="donations" element={<DonationsDashboardPage />} />
        <Route path="donations/:id" element={<DonationDetailsPage />} />
        <Route path="donations/add" element={<RecordDonationPage />} />
        <Route path="chapter-stories" element={<ChapterStoriesPage />} />
        <Route path="chapter-stories/add" element={<AddChapterStoryPage />} />
        <Route path="journal-settings" element={<JournalSettingsPage />} />
        <Route path="settings/site-settings" element={<SiteSettingsPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="notifications/create" element={<CreateNotificationPage />} />
        {/* activities */}
        <Route path="activities" element={<Activities />} />
        <Route path="activities/quiz/add-questions" element={<AddQuizQuestions />} />
        <Route path="activities/quiz/ai-generator" element={<AIQuizGenerator />} />
        <Route path="activities/quiz/add-question-manually" element={<AddQuestionManually />}/>
        <Route  path="activities/quiz/bulk-upload"element={<BulkUploadQuizQuestions />}/>

        <Route path="activities/word-search/add" element={<AddWordSearch />}/>
         <Route path="activities/chapter-audio-story/add" element={<AddChapterAudioStory />}/>
        <Route path="activities/memory-verse/add" element={<AddMemoryVerse />}/>

      

        {/* Word Search */}
        <Route path="word-search" element={<WordSearchManagement />} />
        <Route path="word-search/add-edit" element={<AddEditWordSearch />} />

        <Route path="word-search/add-edit/manual-hidden" element={<ManualHiddenRestoration />} />
        <Route path="word-search/add-edit/manual-verse" element={<ManualVerseRestoration />} />
        <Route path="word-search/add-edit/manual-audio" element={<ManualAudioRevelation />} />
        <Route path="word-search/add-edit/manual-mystery" element={<ManualMysteryScripture />} />

        <Route path="word-search/add-edit/ai-generate" element={<AIGenerateWordSearch />} />
        <Route path="word-search/add-edit/ai-generate/verse-restoration" element={<AIGenerateVerseRestoration />} />
        <Route path="word-search/add-edit/ai-generate/audio-revelation" element={<AIGenerateAudioRevelation />} />
        <Route path="word-search/add-edit/ai-generate/mystery-scripture" element={<AIGenerateMysteryScripture />} />

        <Route path="word-search/add-edit/csv-upload" element={<CSVUploadWordSearch />} />
        <Route path="word-search/add-edit/csv-upload/validate-map" element={<CSVUploadValidateMap />} />
        <Route path="word-search/add-edit/csv-upload/review-images" element={<CSVUploadReviewImages />} />
        <Route path="word-search/add-edit/csv-upload/import-review" element={<CSVUploadImportReview />} />

       

        <Route path="coupon-codes" element={<CouponCodesPage />} />
        <Route path="coupon-codes/create" element={<CreateCouponPage />} />
        <Route path="broad-spectrum" element={<BroadSpectrumPage />} />
        <Route path="divine-counsel" element={<DivineCounselManagementPage />} />
        <Route path="divine-counsel/add" element={<AddDivineCounselTopicPage />} />
        <Route path="group-play-settings" element={<GroupPlaySettings />} />
        <Route path="bible-books" element={<BibleBooksPage />} />
        <Route path="bible-books/edit/:id" element={<EditBookPage />} />
        {/* streaksmanagement */}
        <Route path="streaks/management" element={<StreakManagementPage />} />
         <Route path="streaks" element={<StreakMilestonesRewards />} />
        {/* memory-verse */}
        <Route path="memory-verse" element={<MemoryVerseManagement />} />
        <Route path="memory-verse/add-edit" element={<AddEditMemoryVerse />} />
        <Route path="memory-verse/add-edit/ai-generate" element={<AddEditMemoryVerseAI />} />
{/* mystery-card */} 
      <Route path="/admin/mystery-card" element={<MysteryCardDashboard />} />
      <Route path="/admin/mystery-card/create" element={<CreateMysteryCard />} />
      <Route path="/admin/mystery-card/edit" element={<EditMysteryCard />} />

        {/* Quiz Management */} 
        <Route path="quiz-management" element={<QuizManagement />} />
        <Route path="quiz-management/ai-generator" element={<AIQuestionGenerator />} />

        {/* Manage Plans */}
        <Route path="website-management" element={<ManagePlansPage />} />

        <Route path='users' element={<UserManagementPage />} />
        <Route path="users/roles-permissions" element={<RolesPermissionsPage />} />
        <Route path="users/add" element={<AddUserPage />} />
        <Route path='levels' element={<LevelsPage />} />
        <Route path="questions/quiz/add" element={<QuizQuestionFormPage />} />

      </Route>
      <Route path="/dashboard" element={<Navigate to="/admin" replace />} />
      <Route
        path="/subscriptions"
        element={<Navigate to="/admin/subscriptions" replace />}
      />
      <Route path="/dailyverse" element={<DailyVersesPage />} />
      <Route path="/dailyverse/add" element={<AddDailyVerseWizard />} />

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App