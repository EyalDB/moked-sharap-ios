import WidgetKit
import SwiftUI

struct EmergencyEntry: TimelineEntry {
    let date: Date
}

struct EmergencyProvider: TimelineProvider {
    func placeholder(in context: Context) -> EmergencyEntry {
        EmergencyEntry(date: Date())
    }

    func getSnapshot(in context: Context, completion: @escaping (EmergencyEntry) -> Void) {
        completion(EmergencyEntry(date: Date()))
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<EmergencyEntry>) -> Void) {
        let entry = EmergencyEntry(date: Date())
        let timeline = Timeline(entries: [entry], policy: .never)
        completion(timeline)
    }
}

struct EmergencyWidgetEntryView: View {
    var entry: EmergencyProvider.Entry
    @Environment(\.widgetFamily) var family

    var body: some View {
        Link(destination: URL(string: "mokadsharap://call")!) {
        ZStack {
            // Background gradient
            LinearGradient(
                gradient: Gradient(colors: [Color.white, Color(red: 0.98, green: 0.96, blue: 0.96)]),
                startPoint: .top,
                endPoint: .bottom
            )

            VStack(spacing: 8) {
                // Emergency icon
                ZStack {
                    Circle()
                        .fill(Color.red)
                        .frame(width: family == .systemSmall ? 50 : 70, height: family == .systemSmall ? 50 : 70)

                    Image(systemName: "phone.fill")
                        .font(.system(size: family == .systemSmall ? 24 : 32, weight: .bold))
                        .foregroundColor(.white)
                }

                Text("מוקד שרפ")
                    .font(.system(size: family == .systemSmall ? 14 : 18, weight: .bold))
                    .foregroundColor(.black)

                if family != .systemSmall {
                    Text("לחץ להתקשר")
                        .font(.system(size: 12))
                        .foregroundColor(.red)
                }
            }
            .padding()
        }
        }
    }
}

@main
struct EmergencyWidget: Widget {
    let kind: String = "EmergencyWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: EmergencyProvider()) { entry in
            EmergencyWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("מוקד שרפ")
        .description("התקשר למוקד שרפ בלחיצה אחת")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}
