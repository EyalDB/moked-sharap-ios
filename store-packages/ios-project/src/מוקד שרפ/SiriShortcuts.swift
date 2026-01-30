import Intents
import UIKit

class SiriShortcuts {

    static let shared = SiriShortcuts()

    // Activity type for Siri
    static let activityType = "ai.elorin.projects.callEmergency"

    // Donate the shortcut to Siri
    func donateInteraction() {
        let intent = CallEmergencyIntent()
        intent.suggestedInvocationPhrase = "התקשר למוקד שרפ"

        let interaction = INInteraction(intent: intent, response: nil)
        interaction.donate { error in
            if let error = error {
                print("Siri donation error: \(error.localizedDescription)")
            } else {
                print("Siri shortcut donated successfully")
            }
        }
    }

    // Create user activity for Siri suggestions
    func createUserActivity() -> NSUserActivity {
        let activity = NSUserActivity(activityType: SiriShortcuts.activityType)
        activity.title = "התקשר למוקד שרפ"
        activity.userInfo = ["action": "call"]
        activity.isEligibleForSearch = true
        activity.isEligibleForPrediction = true
        activity.persistentIdentifier = NSUserActivityPersistentIdentifier(SiriShortcuts.activityType)
        activity.suggestedInvocationPhrase = "התקשר למוקד שרפ"

        let attributes = CSSearchableItemAttributeSet(contentType: .item)
        attributes.contentDescription = "חיוג מהיר למוקד שרפ - שירותי רפואה"
        attributes.thumbnailData = UIImage(named: "AppIcon")?.pngData()
        activity.contentAttributeSet = attributes

        return activity
    }

    // Handle the shortcut action
    static func handleShortcut() {
        // Trigger haptic feedback
        let generator = UIImpactFeedbackGenerator(style: .heavy)
        generator.impactOccurred()

        // Make the phone call
        if let phoneURL = URL(string: "tel:+972732341234") {
            UIApplication.shared.open(phoneURL)
        }
    }
}

// Custom Intent for Siri
class CallEmergencyIntent: INIntent {
    override init() {
        super.init()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
}

// Import CoreSpotlight for search
import CoreSpotlight
import MobileCoreServices
